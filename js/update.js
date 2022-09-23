document.getElementById("back").onclick = function(){//voltar para o index
    location.href = "index.html";
};

document.getElementById("cad").onclick = function(){
    var _update = confirm("Tem certeza que deseja alterar os dados de "+name+" (ID "+id+")");//confirma a escolha
    if(_update){

        //pegar os novos dados
        name = document.getElementById("name").value;
        email = document.getElementById("email").value;
        gender = document.getElementById("gender").value;
        status = document.getElementById("status").value;
        //

        const dataObject = {//construir o objeto que sera utilizado na request
            "name": name,
            "gender": gender,
            "email": email,
            "status": status,
        }

        //para o caso do usuário atualizar a página, assim os dados antigos não serão carregados no lugar dos ja alterados
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('gender', gender);
        localStorage.setItem('status', status);
        //

        updateData(dataObject);
    }
};

var id, name, email, gender, status;

//pegar os dados do localStorage e atribuir a varíavel
id = localStorage.getItem('id');
name = localStorage.getItem('name');
email = localStorage.getItem('email');
gender = localStorage.getItem('gender');
status = localStorage.getItem('status');
//

//colocar os dados nos devidos campos
document.getElementById("name").value = name;
document.getElementById("email").value = email;
document.getElementById("gender").value = gender;
document.getElementById("status").value = status ;
//

const updateData = async (dataObject) =>{
    const response = await fetch('https://gorest.co.in/public/v2/users/'+id, {//update request
        method: 'PUT', 
        headers: {
            Authorization: 'Bearer 341c8f348e9b8d334010b09cf4f864f1c3880b2a7871ec9e6a0fb97e20f8680b',
            "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(dataObject),
    });

    console.log(response.status);//apenas para saber o código do possível erro

    //verificação e retorno ao usuário de alguns status da request(erro, sucesso...)
    if(response.status==200){
        alert("Os dados de "+dataObject.name+" foram alterados com sucesso!!");
    }
    if(response.status==422){
        alert("Falha no envio dos dados, talvez você tenha digitado algo com um formato inválido!");
    }
    if(response.status==429){
        alert("Você tentou fazer muitas alterações em um curto período de tempo, tente novamente mais devagar.");
    }
    if(response.status==500){
        alert("Erro interno da API.");
    }
    //
}