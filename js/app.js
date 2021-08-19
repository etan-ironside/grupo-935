window.onload=function(){
    btnReg = document.getElementById("btnReg");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal=document.getElementById("principal");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContra = document.getElementById("contraR");
    txtConfirmacion = document.getElementById("confiR");
    txtFecha = document.getElementById("fechaR");
    btnRegR = document.getElementById("btnRegR");
    btnIng = document.getElementById("BtnIng");
    txtCorreoI=document.getElementById("correo");
    txtContraI=document.getElementById("contra");
    nombreP=document.getElementById("nombreP");
    menP=document.getElementById("correoM");
    menS=document.getElementById("mensajeM");
    btnEnviar=document.getElementById("enviarM");
    photo=document.getElementById("photo");
    camera=document.getElementById("camera");
    camara=document.getElementById("camara");
    abrir =document.getElementById("abrir");
    mapa = document.getElementById("mapa");
   
    if(localStorage.getItem("login")!== "1"){
        ingreso.style.display = "block";
        principal.style.display = "none";
        redactar.style.display = "none";
        document.getElementById("camara").style.display = "none";
    }
    else{
        ingreso.style.display = "none";
        principal.style.display = "block";
        redactar.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM;

    }
}



btnReg.addEventListener("click", function(){
    ingreso.style.display="none";
    registro.style.display="block";
});


btnRegR.addEventListener("click",function(){
    if(txtCorreo.value==""){
        alert("escriba el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    } else {
        txtCorreo.classList.remove("errorCampo");
    }

    if(txtNombre.value==""){
        alert("debe ingresar nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    } else {
        txtNombre.classList.remove("errorCampo");
    }

    if(txtContra.value==""){
        alert("escriba la contraseña");
        txtContra.classList.add("errorCampo");
        return false;
    } else {
        txtContra.classList.remove("errorCampo");
    }

    if(txtConfirmacion.value==""){
        alert("escriba la confirmacion");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    } else {
        txtConfirmacion.classList.remove("errorCampo");
    }

    if(txtConfirmacion.value!==txtContra.value){
        alert("La confirmacion y la contraseña no coinciden");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    } else {
        txtConfirmacion.classList.remove("errorCampo");
    }

    if(txtFecha.value==""){
        alert("ingrese su fecha de nacimiento");
        txtFecha.classList.add("errorCampo");
        return false;
    } else {
        txtFecha.classList.remove("errorCampo");
    }

    let datos= new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contraR", txtContra.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tpaeaop.orgfree.com/registro.php", {
        method:'POST',
        body:datos
    })

    .then(function(response){
        if(response.ok){
            alert("Usuario registrado");
        }
        else {
            alert("Registro erroneo");
            console.log(response);
        }
    })

    .catch(function(err){
        alert("Ocurrio un error inesperado");
        console.log(err);
    })
});

document.getElementById("btnIng").addEventListener("click", function(){
    if(txtCorreoI.value==""){
        alert("escriba el correo");
        txtCorreoI.classList.add("errorCampo");
        return false;
    } else{
        txtCorreoI.classList.remove("errorCampo");
    }
    if(txtContraI.value==""){
        alert("escriba la contraseña");
        txtContraI.classList.add("errorCampo");
        return false;
    } else{
        txtContraI.classList.remove("errorCampo");
    }
    let datosI= new FormData();
    datosI.append("correo", txtCorreoI.value);
    datosI.append("contra", txtContraI.value);

    fetch("http://tpaeaop.orgfree.com/ingreso.php", {
        method:'POST',
        body:datosI
    })

    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.fallo== "contrasena"){
            alert("escriba la contraseña correcta");
        }
        else {
            nombre= data.nombre;
            correo=data.correo;
            ingreso.style.display="none";
            principal.style.display="block";
            nombreP.innerHTML=nombre;
            localStorage.setItem("login",1);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err){
        alert("error inesperado");
        console.log(err);
    })
});

function abrirBarra(){
    document.getElementById("barraMenu").style.width="250px";
}

function cerrarBarra(){
    document.getElementById("barraMenu").style.width="0";
}

function leerM(){
    let datosLM= new FormData();
    datosLM.append("correoUsuario", correo);
    fetch("http://tpaeaop.orgfree.com/leerMensajes.php", {
        method:'POST',
        body:datosLM
    })

    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for(let x=0; x <data.length; x++){
            document.getElementById("mensajes").innerHTML=
            document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" + 
            data[x].fecha + "<br>";
        }
    })
    .catch(function(err){
        alert("Ocurrio un error ->" + err);
        console.log(err);
    });
}

  function mensajes(){
   redactar.style.display = "block";
   document.getElementById("mensajes").style.display = "block";
   document.getElementById("camera").style.display = "none";
   cerrarBarra();
   

  }

    function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    redactar.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";

}

document.getElementById("enviarM").addEventListener("click",function(){
    if(menP.value==""){
        alert("agregue el destinatario");
        menP.classList.add("errorCampo");
        return;
    } else{
        menP.classList.remove("errorCampo");
    }

    if(menS.value==""){
        alert("escriba el mensje");
        menS.classList.add("errorCampo");
        return;
    } else{
        menS.classList.remove("errorCampo");
    }

    let datosM= new FormData();
    datosM.append("correoM", menP.value);
    datosM.append("mensajeM", menS.value);

    fetch("http://tpaeaop.orgfree.com/registrarMensaje.php", {
        method:'POST',
        body:datosM
    })

    .then(function(response){
        if(response.ok){
            alert("el mensaje ha sido enviado");
        }
        else{
            alert("el mensaje no se ha enviado");
            console.log(response);
        }
        return response.json();
    })
    
    .catch(function(err){
        alert("ocurrio un error inesperado");
        console.log(err);
    })
})


function tomarFoto(){
    redactar.style.display= "none";
    document.getElementById("mensajes").style.display="none";
    camara.style.display = "block";
    cerrarBarra();
}

function obtenerSO(){
    let so = null;
    let platform = window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    if (iosPlatforms.includes(platform)){
        so = 'IOS';
    }
      return so;  
}

function obtenerLugar(){
    coordenadas = {lat: 0, lon:0};
    navigator.geolocation.getCurrentPosition(function(position){
    coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
    .then(response => response.json())
    .then(data =>{
        document.getElementById("map").value = data.address.country + " " + data.address.state;
    })
    .catch(error=>{
        console.log(error);
        coordenadas={lat:0, lon:0};
    })
    })
}

document.getElementById("abrir").addEventListener("click",function(){
    camera.click();
});

//*abrir.addEventListener("click",function(){
 //*   camera.click();
//*}); 

camera.addEventListener("change",function(e){
    ruta = URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src = ruta;
    if (obtenerSO() == "IOS"){
    let link = document.createElement('a');
    link.download = "test.png";
    //link.href = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.href = ruta;
    link.click();
    alert("Foto tomada");
    }
});


mapa.addEventListener('click', function(){
window.open("http://www.openstreetmap.org/?mlat" + coordenadas.lat + "&mlon" + coordenadas.lon)
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../sw.js').then( () => {
        console.log('Service Worker Registered')
      });
    });
  }
