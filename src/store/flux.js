const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			user: [],
			email: [],
			login: [],
			id: []
			
		},
		actions: {

			login: async (user) => {
				const store = getStore();
				try {
					const url = "https://expert-journey-7vr76wvw4j5ghwxxj-3000.app.github.dev/"
					const resp = await fetch(`${url}/users/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					});
					if (!resp.ok) {
						throw new Error(`Http error! status: ${resp.status}`);
					}
					const user = await resp.json();
					console.log(user);
					
				} catch (error) {
					console.error("Error loading user", error);

				}
			},
			addRegister: async (user) => {
				const store = getStore();
				try {
					const resp = await fetch(`https:`, {
						method: "POST",
						body: JSON.stringify(user),
						headers: { 'Content-Type': 'application/json' }

					});
					if (!resp.ok) {
						throw new Error('Http error! status: ${resp.status}');
					}
					await getActions().getUser();
				} catch (error) {
					console.error("Error adding contacts", error);

				}
			},
		}
	};
};

export default getState;