const initialState = {
  data: {},
  user: {}
};

function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART":
      state.data[action.payload[0]] = action.payload[1];
      console.log(state.data);
      return { data: state.data ,user:state.user };
    
    case "ADD_USER":
      state.user[action.payload[0]] = action.payload[1];
      console.log(state.user);
      return { data: state.data , user:state.user};
      
    case "REMOVE_USER":
      state.user={}
      return { data: state.data , user:state.user};

    case "REMOVE_CART":
      delete state.cart[action.payload[0]]
      return { data: state.data , user:state.user};

    default:
      return state;
  }
}
export default RootReducer;
