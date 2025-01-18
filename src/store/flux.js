import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {


	const url = "http://localhost:3000/"
	const cloudUrl = 'https://api.cloudinary.com/v1_1/dzw2kegzu/upload';

	return {
		store: {
			user: [],
			token: null,
			posts: [],
			singlePost: null
		},
		actions: {
			isLogin: () => {
				const token = localStorage.getItem('token') || null;
				const user = JSON.parse(localStorage.getItem('user') || null);
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
					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					const data = await resp.json();
					setStore ({token: data.access_token})
					localStorage.setItem('token', data.access_token);
					const payload = jwtDecode(data.access_token);
					const user = payload.user;
					setStore ({user: user})
				
					localStorage.setItem('user', JSON.stringify(user));        
					console.log(user, payload);

				} catch (error) {
					console.error("Error loading user", error);

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
					
					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					// await getActions();
					const data = await resp.json();
					console.log (data);
					
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
					setStore({token: null, user: []})
					localStorage.removeItem('token');
					localStorage.removeItem('user');
				} catch (error) {
					console.error("Error logout", error);
				}
			},
			updateUser : async(data) => {
				
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
					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					const userUpdated = await resp.json();
					setStore({user: userUpdated})
				} catch (error) {
					console.error("Error logout", error);
				}
			},

			fetchPosts: async () => {
                try {
                    const response = await fetch(url + `/posts`);
                    if (!response.ok) {
                        throw new Error('Error al obtener las publicaciones');
                    }
                    const data = await response.json();
                    if (data.status === 'success') {
                        setStore({ posts: data.data }); // se guardan las pubs en la store
                    } else {
                        console.error('Error: ', data);
                    }
                } catch (error) {
                    console.error('Error al hacer la petición:', error);
                }
            },

			getSinglePost: async (id) => {
                try {
                    const response = await fetch(url + `/posts` + `/${id}`);
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setStore({ singlePost: data }); // se almacena en la store
                } catch (error) {
                    console.error("Error fetching single post:", error);
                }
            },
			uploadImageProfile: async (file) => {
				const store = getStore();
				const actions = getActions();
				try {
                    const formData = new FormData();
					formData.append('upload_preset','images_profile');
					formData.append('file',file);

					const resp = await fetch(cloudUrl, {
						method: 'POST',
						body: formData
					})
					if (!resp.ok) {
                        throw new Error(`Error ${resp.status}: ${resp.statusText}`);
                    }
					const cloudResp = await resp.json();
					
					await actions.updateUser({image: cloudResp.secure_url});
					

				} catch (error) {
					console.error("Error uploading image:", error);
				}
			},
		}
	};
}
	


export default getState;