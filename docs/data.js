/** **************************************MENU**************************************************/
// funcionalidad del side Menú
function toggleMenu() { // añadir función onclick="toggleMenu()" al botón del nav bar y al botón cerrar.
  if (sideMenu.className.indexOf('menu_closed') >= 0) { // primero revisamos si la clase d-none esta
    openMenu(); // si esta la clase quiere decir que el menú esta cerrado, asi que llamamos la funcion para abrirlo
  } else {
    closeMenu(); // si no esta la clase, le indicamos que cierre el menu
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed'); // quitando clase display-none
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed'); // añadimos la clase display-none
  sideMenu.classList.remove('menu_open');
}
/** **************************************FIN MENU**************************************************/

// LOGOUT
window.logout = (() => {
  firebase.auth().signOut()
    .then(() => {
      console.log('chao');
    })
    .catch();
});

// Funcion para guardar publicaciones

function saveMessage() {
  const currentUser = firebase.auth().currentUser;
  const commentText = comment.value;
  const newMessageKey = firebase.database().ref().child('posts').push().key;
  firebase.database().ref(`posts/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    text: commentText
  });
}

// Buscar mensajes desde data
firebase.database().ref('posts')
  .limitToLast(3)
  .on('child_added', (newMessage) => {
    cont.innerHTML += `
  <div id='${newMessage.key}'><img src ="icono/Perfil-usuario.svg"> ${newMessage.val().creatorName}
                ${newMessage.val().text} <i class="far fa-heart"></i> <i class="fas fa-trash" data-id="${newMessage.key}" onclick="deleteButtonClicked(event)"></i></div>
            `;
    
    /* const newMessageKey = firebase.database().ref().child('posts').push().key;
    let trsh = document.getAttribute('data-id');
    trsh.addEventListener('click', () =>{
      
    });
*/
  });
  
function deleteButtonClicked(event) {
  const postsID = event.target.getAttribute('data-id');
  const postsRef = firebase.database().ref('users/' + postsID);
  postsRef.remove();
  cont.removeChild(cont.childNodes[0] && cont.childNodes[1]);
}
// Funcion eliminar publicacion


/* function removeTxt() {
  commentTxt.parentNode.removeChild(commentTxt);
}
*/


