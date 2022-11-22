import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js'

try {
    var firebaseConfig = {
        apiKey: "AIzaSyC-j1K007NcvvyH5xtPCJrfp6AxKrXtYp4",
        authDomain: "bot-roleta-2658b.firebaseapp.com",
        projectId: "bot-roleta-2658b",
        storageBucket: "bot-roleta-2658b.appspot.com",
        messagingSenderId: "584526324106",
        appId: "1:584526324106:web:e1f8dc8ba8efb2586d2873",
        measurementId: "G-DXDNBTJRGV"
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.comand == "login") {
            console.log(request.email)
            console.log(request.password)

            signInWithEmailAndPassword(auth, request.email, request.password)
                .then((userCredential) => {
                    console.log(userCredential)
                    // Signed in
                    const user = userCredential.user
                    // ...
                    sendResponse({ type: "result", status: "sucess", data: "ok", req: request })
                })
                .catch((error) => {
                    console.log(error)
                    sendResponse({ type: "result", status: "erro", data: error, req: request })
                })

            return true;
        }

    })

} catch (error) {
    console.log(error)
}

