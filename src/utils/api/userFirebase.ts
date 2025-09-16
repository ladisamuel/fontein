import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from 'firebase/app';
import { toast } from "react-toastify";
import { firebaseAuth } from "../../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getAuth,  } from "firebase/auth";

interface UserInput {
    email: string,
    password: string
}

// interface TokenResponse {
//     data: {
//         accessToken: string;
//         refreshToken: string;
//     };
//     user: {
//       id: string;
//       email: string;
//       name: string;
//     };
//   }


const userSignUp = async (email:UserInput['email'], password:UserInput['password']) => {
 

    await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((res) => {
            // Signed up 
            // const user = res.user;
            toast.success('User Signed Up successfully')
            console.log('Response: ', res);
            console.log('Response user: ', res.user);
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error', error);
            console.log('errorCode', errorCode);
            console.log('errorMessage', errorMessage);
            
            // ..
      });
}

const userLogin = async (email:UserInput['email'], password:UserInput['password']) => {

    let data: any = {}

    try{
        const response = await signInWithEmailAndPassword(firebaseAuth, email, password)
        
        const user = response.user;
        const accessToken = await user.getIdToken();
        const refreshToken = user.refreshToken;

        console.log(user);
        
        data = {
            access: accessToken,
            refresh: refreshToken,
            user: {
                id: user.uid,
                email: user.email,
                name: user.displayName,

            },
        }

        return data;
    }catch(error){
        if (error instanceof FirebaseError) {
            if (error.code == 'auth/invalid-credential'){
                return {error: 'Email or Password Incorrect'}
            } else {
                return {error: 'Error occurred, Please try again!'}
            }
        } else {
            return {error: 'Error occurred, Please try again!'}
        }
        
    }

    // await signInWithEmailAndPassword(firebaseAuth, email, password)
    // .then((response) => {
    //     // Signed in 
    //     // setAuth(user)
    //     return response
    //     // ...
    // }).then((res)=>{

    //     data = {
    //         access: res?.user?.getIdToken(),
    //         refresh: res?.user?.refreshToken,
    //         user: res?.user
    //     }


    //     // console.log('Response: ', res);
    //     console.log('Response user: ', data);
        
    // })
    // .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     console.log('errorCode: ', error);
    //     // return {errorCode: errorCode}

    // });

    return data
}

const userGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    let data: any = {}


    try{
        const result = await signInWithPopup(firebaseAuth, provider)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user; 
        console.log('user', user);
        console.log('token in api', token);
        
        data = {
            access: token,
            refresh: '',
            user: {
                id: user.uid,
                email: user.email,
                name: user.displayName,

            },
        }
        console.log('data in api', data);


        return data;
    }catch(error:any){
        // Handle Errors here.
        console.log('error ocurred', error);
        
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);


        if (credential || errorCode || errorMessage) {
            return {error: 'Error Occurred, Try Again!'}
        }
        data = {error: 'error ocurred'}
        return data
    }
}


export {
    userSignUp,
    userLogin,
    userGoogleSignIn,
}
 