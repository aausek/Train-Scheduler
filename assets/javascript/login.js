//   //Setting up Google Authentication using a redirect.
//   firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//   //This gives you a Google Access Token.
//    var token = result.credential.accessToken;
//   }
//   var user = result.user;
// });

// 	// Start a sign in process for an unauthenticated user.
// 	var provider = new firebase.auth.GoogleAuthProvider();
// 	provider.addScope('profile');
// 	provider.addScope('email');
// 	firebase.auth().signInWithRedirect(provider);