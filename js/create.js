document.getElementById("cad").onclick = function(){//pegar os valores ao clicar no botão
    var name, email, gender , status;

    //pegar os dados e armazenar nas variáveis
    name = document.getElementById("nameCreate").value;
    email = document.getElementById("emailCreate").value;
    gender = document.getElementById("genderCreate").value;
    status = document.getElementById("statusCreate").value;
    //
    
    const dataObject = {//construir o objeto que sera utilizado na request
        "name": name,
        "gender": gender,
        "email": email,
        "status": status,
    }

    postData(dataObject);
};

const postData = async (dataObject) =>{
    const response = await fetch('https://gorest.co.in/public/v2/users', {//post request
        method: 'POST', 
        headers: {
            Authorization: 'Bearer 341c8f348e9b8d334010b09cf4f864f1c3880b2a7871ec9e6a0fb97e20f8680b',
            "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(dataObject),
    });

    console.log(response.status);//apenas para saber o código do possível erro

    //verificação e retorno ao usuário de alguns status da request(erro, sucesso...)
    if(response.status==201 || response.status==200){
        alert(dataObject.name+" foi cadastrado com sucesso!!");
        window.location.reload();
    }
    if(response.status==422){
        alert("Falha no envio dos dados, talvez você tenha digitado algo com um formato inválido!");
    }
    if(response.status==429){
        alert("Você tentou fazer muitos cadastros em um curto período de tempo, tente novamente mais devagar.");
    }
    if(response.status==500){
        alert("Erro interno da API.");
    }
    //
};