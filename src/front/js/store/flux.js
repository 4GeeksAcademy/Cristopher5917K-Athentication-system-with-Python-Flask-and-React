const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null
		},
		actions: {
			register: async (user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/register`, {
						method: "POST",
						body: user
					})
					return response.status

				} catch (error) {
					console.log(error)
					return response.status
				}
			},

			login: async (user) => {
				try {
					console.log(user)
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					})

					const data = await response.json()
					if (response.ok) {
						setStore({
							currentUser: data.user
						})

						localStorage.setItem("token", data.token)
						
					}
					return response.status
				} catch (error) {
					console.log(error)
					return false
				}


			},

			logOut: () => {
				try {
					setStore({
						currentUser: false
					})
					localStorage.removeItem("token")

				} catch (error) {
					console.log(error)
				}
			},

			private: async()=>{
				const response = await fetch(`${process.env.BACKEND_URL}/private`,{
					headers:{"Authorization": `Bearer ${localStorage.getItem("token")}`}
				})

				if (response.ok){
					const data = await response.json()
					setStore({currentUser: data})
					return true
				}
				setStore({currentUser:false})
				return false
			},

		}


	};
};

export default getState;
