const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        user2:null,
        count:0,
        notificationname:null,
        
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        user2:null,
        count:0,
        notificationname:null,
      
      };
      case "NOTIFICATION":
        console.log("notification");
      return {
 ...state,
count:1,
notificationname:action.payload,
      };
  
      case "LOGIN_SEARCH":
    
      return {
    
        ...state,
        user2:action.payload,
       
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        user2:null,
        count:0,
        notificationname:null,
      
      };
      case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error: false,
          user2:null,
          count:0,
          notificationname:null,
        
        };
        
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
case "LOGIN_remove":
return{
user:null,
isFetching:false,
error:false,
user2:null,
count:0,
notificationname:null,

};

    default:
      return state;
  }
};

export default AuthReducer;
