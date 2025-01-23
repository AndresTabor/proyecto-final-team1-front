import { jwtDecode } from "jwt-decode";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

const getState = ({ getStore, getActions, setStore }) => {


	
	const url = "https://flask-rest-hello-wtzk.onrender.com";
	const url_posts = `${url}/posts`
	const cloudUrl = "https://api.cloudinary.com/v1_1/dzw2kegzu/upload";
	
	return {
		store: {
			user: {},
			token: null,
			posts: [],
			singlePost: null,
			error: null,
			filters: {
				profession_title: "",
				location: '',
				min_price: '',
				max_price: '',
				latitude: null,
				longitude: null,
				page: 1,
				limit: 10
			}
		},
		actions: {
			isLogin: () => {
				const token = localStorage.getItem('token') || null;
				const user = JSON.parse(localStorage.getItem('user') || null);

				if (!token) return false;
				const decoded = jwtDecode(token);
				const currentTime = Math.floor(Date.now() / 1000);
				const isTokenValid = decoded.exp > currentTime;
				if (!isTokenValid) {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					setStore({ token: null, user: {} });
					return false;
				}

				if (token && user) {
					setStore({ token: token, user: user });
				}
			},
			login: async (newUser) => {
				const store = getStore();
				try {
					const resp = await fetch(`${url}/users/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newUser),
					});
					const data = await resp.json();
					if (!resp.ok) {

						setStore({ error: data.msg })
						throw new Error(`Http error! status: ${resp.status}`);
					}

					setStore({ token: data.access_token })
					localStorage.setItem('token', data.access_token);
					const payload = jwtDecode(data.access_token);
					const user = payload.user;
					setStore({ user: user })

					localStorage.setItem('user', JSON.stringify(user));
					console.log(user, payload);
					setStore({ error: null });



				} catch (error) {
					console.error("Error loading user", error);
					throw error
				}
			},


			register: async (newUser) => {
				console.log(newUser);

				// const store = getStore();
				try {
					const resp = await fetch(`${url}/users/register`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newUser),
					});
					const data = await resp.json();

					if (!resp.ok) {
						setStore({ error: data.msg })
						throw new Error(`Http error! status: ${resp.status}`);
					}
					// await getActions();


					console.log(data);

				} catch (error) {
					console.error("Error register", error);

				}
			},
			logout: async () => {

				const store = getStore();
				try {
					const resp = await fetch(`${url}/users/logout`, {
						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					setStore({ token: null, user: [] })
					localStorage.removeItem('token');
					localStorage.removeItem('user');
				} catch (error) {
					console.error("Error logout", error);
				}
			},
			updateUser: async (data) => {

				const store = getStore();
				try {

					const resp = await fetch(`${url}/users/profile`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${store.token}`,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					});
					const userUpdated = await resp.json();
					if (!resp.ok) {
						setStore({ error: data.msg })
						throw new Error(`Http error! status: ${resp.status}`);
					}

					console.log(userUpdated);

					setStore({ user: userUpdated })
					localStorage.setItem('user', JSON.stringify(userUpdated));
				} catch (error) {
					console.error("Error logout", error);
				}
			},


			//  			------- POSTS ENDPOINTS -------

			//GET ALL POSTS
			fetchPosts: async (filters) => {
				console.log(filters);
				const store = getStore();
				// const { profession_title, location, min_price, max_price, latitude, longitude, page, limit } = filters;
				const { profession_title,location,min_price,max_price,page } = filters;

				try {

					// const query = new URLSearchParams({
					// 	profession_title,
					// 	location,
					// 	min_price,
					// 	max_price,
					// 	latitude: latitude || "",
					// 	longitude: longitude || "",
					// 	page,
					// 	limit
					// });
					const query = new URLSearchParams({
						profession_title,
						location,
						min_price,
						max_price,
						page
					});

					const response = await fetch(`${url_posts}/filter_posts/?${query}`);
					if (!response.ok) {
						throw new Error('Error al obtener las publicaciones');
					}
					const data = await response.json();
					if (data.status === 'success') {
						setStore({ 
							posts: data.data,
							filters: { ...filters }, // Actualiza los filtros en el estado global
						});
						 
					} else {
						console.error('Error: ', data);
					}
				} catch (error) {
					console.error('Error al hacer la petición:', error);
				}
			},

			//GET 1 POST by ID
			getSinglePost: async (id) => {
                try {
                    const response = await fetch(`${url_posts}/${id}`);
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setStore({ singlePost: data }); // se almacena en la store
                } catch (error) {
                    console.error("Error fetching single post:", error);
                }
            },
			
			// CREATE POST
			createPost: async (postData) => {
				const store = getStore();
				try {
					const response = await fetch(url_posts, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							//Authorization: `Bearer ${store.token}` // si se usa token para autenticar
						},
						body: JSON.stringify(postData),
					});

					if (response.ok) {
						const data = await response.json();
						// actualizar la lista de posts en el store
						const updatedPosts = [...store.posts, data.data];
						setStore({ posts: updatedPosts });
						return { success: true, message: "Post creado exitosamente" };
					} else {
						const errorData = await response.json();
						return { success: false, message: errorData.error || "Error al crear el post" };
					}
				} catch (error) {
					console.error("Error creando post:", error);
					return { success: false, message: "Error de red o servidor" };
				}
			},

			// EDIT POST
			editPost: async (id, postData) => {
				try {
					const response = await fetch(`${url_posts}/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(postData)
					});
			
					if (response.ok) {
						const data = await response.json();
						const store = getStore();
			
						// Actualizar el post en la store
						const updatedPosts = store.posts.map(post =>
							post.id === id ? { ...post, ...postData } : post
						);
			
						setStore({ posts: updatedPosts, singlePost: data.data });
						return { success: true, message: "Post actualizado exitosamente" };
					} else {
						const errorData = await response.json();
						return { success: false, message: errorData.error || "Error al actualizar el post" };
					}
				} catch (error) {
					console.error("Error actualizando el post:", error);
					return { success: false, message: "Error de red o servidor" };
				}
			},
			fetchPostById: async (id) => {
				try {
					const response = await fetch(`${url_posts}/${id}`);
					if (!response.ok) {
						throw new Error(`Error ${response.status}: ${response.statusText}`);
					}
					const data = await response.json();
					setStore({ singlePost: data });
					return data;
				} catch (error) {
					console.error("Error fetching single post:", error);
					return null;
				}
			},

			// DELETE POST
			deletePost: async (id) => {
				const store = getStore();
				try {
					const response = await fetch(`${url_posts}/${id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							// Authorization: `Bearer ${store.token}`
						}
					});
					if (response.ok) {
						const updatedPosts = store.posts.filter(post => post.id !== id);
						setStore({ posts: updatedPosts });
						return { success: true, message: "Post eliminado exitosamente" };
					} else {
						const errorData = await response.json();
						return { success: false, message: errorData.error || "Error al eliminar el post" };
					}
				} catch (error) {
					console.error("Error eliminando el post:", error);
					return { success: false, message: "Error de red o servidor" };
				}
			},

			
			uploadImageProfile: async (file) => {
				const store = getStore();
				const actions = getActions();
				try {
					const formData = new FormData();
					formData.append('upload_preset', 'images_profile');
					formData.append('file', file);

					const resp = await fetch(cloudUrl, {
						method: 'POST',
						body: formData
					})
					if (!resp.ok) {
						throw new Error(`Error ${resp.status}: ${resp.statusText}`);
					}
					const cloudResp = await resp.json();

					await actions.updateUser({ image: cloudResp.secure_url });


				} catch (error) {
					console.error("Error uploading image:", error);
				}
			},
			removeFavorite: async (id) => {
				const store = getStore();
				try {
					const resp = await fetch(`${url}/favorites/remove/${id}`, {
						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					const data = await resp.json();
					console.log(data);
					const newFavorites = store.user.following.filter(favorite => favorite.id !== id);
					setStore({ user: { ...store.user, following: newFavorites } });
					localStorage.setItem('user', JSON.stringify(store.user));
				} catch (error) {
					console.error("Error removing favorite", error);
				}
			},
			addFavorite: async (id) => {
				const store = getStore();
				try {
					const resp = await fetch(`${url}/favorites/add`, {
						method: "POST",
						headers: {
							"Authorization": `Bearer ${store.token}`,
							"content-type": "application/json"
						},
						body: JSON.stringify({ "user_to_id": Number(id) })
					});

					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					const data = await resp.json();
					const newFavorites = [...store.user.following, data];
					setStore({ user: { ...store.user, following: newFavorites } });
					localStorage.setItem('user', JSON.stringify(store.user));
				} catch (error) {
					console.error("Error adding favorite", error);
				}
			},
			getFavorites: async () => {
				const store = getStore();
				try {
					const resp = await fetch(`${url}/favorites/my-favorites`, {
						headers: {
							"Authorization": `Bearer ${store.token}`
						}
					}
					)
					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					const data = await resp.json();
					console.log(data);

					setStore({ user: { ...store.user, following: data } });
				} catch (error) {
					console.error(error);
				}
			},
			sendMessage: async (senderId, receiverId, content) => {
				const senderName = getStore().user.fullname
				try {
					await addDoc(collection(db, "messages"), {
						senderId,
						senderName,
						receiverId,
						content,
						timestamp: serverTimestamp(),
					});
					console.log("Message sent!");
				} catch (error) {
					console.error("Error sending message: ", error);
				}
			},
			getUserById: async (userId) => {
				try {
					const response = await fetch(url + `/users/` + userId);
					if (!response.ok) {
						throw new Error(`Error ${response.status}: ${response.statusText}`);
					}
					const data = await response.json();
					return data
				} catch (error) {
					console.error("Error fetching user by id:", error);
				}
			}
		}
	};
}



export default getState;
