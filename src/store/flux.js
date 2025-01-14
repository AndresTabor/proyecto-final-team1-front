const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			user: [],
			token: null
		},
		actions: {

			login: async (newUser) => {
				const store = getStore();
				try {
					const url = "https://expert-journey-7vr76wvw4j5ghwxxj-3000.app.github.dev"
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
					const user = await resp.json();
					setStore ({token: user.access_token, user: newUser})
					console.log(user);

				} catch (error) {
					console.error("Error loading user", error);

				}
			},
			register: async (newUser) => {
				console.log(newUser);
				
				// const store = getStore();
				try {
					const url = "https://expert-journey-7vr76wvw4j5ghwxxj-3000.app.github.dev"
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
				setStore({token: null, user: null})
				// const store = getStore();
				// try {
				// 	const url = "https://expert-journey-7vr76wvw4j5ghwxxj-3000.app.github.dev"
				// 	const resp = await fetch(`${url}/users/logout`, {
				// 		// method: "DELETE"
				// 	});
				// 	if (!resp.ok) {
				// 		throw new Error(`Http error! status: ${resp.status}`);
				// 	}
				// } catch (error) {
				// 	console.error("Error logout", error);
				// }
			}
		}
	};
}
	


export default getState;