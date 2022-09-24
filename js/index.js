(async function getData(){
    try{
        //API
        const response = await fetch('https://gorest.co.in/public/v2/users',{
            method: 'GET',
            headers: {
                Authorization: 'Bearer 341c8f348e9b8d334010b09cf4f864f1c3880b2a7871ec9e6a0fb97e20f8680b',
            },
        });
        const jsonData = await response.json();
        let table = document.getElementById("table");//pegar id da tabela

        console.log(jsonData);

        for(const post of jsonData){//construir as linhas da tabela utilizando os dados da api
            let line = createLine(post);
            table.appendChild(line);
        }
    } catch(e){
        console.log("ERRO: ",e);
    }
})();

function createLine(data){
    line = document.createElement("tr");//criar linha
    
    //criar as células da tabela
    tdId = document.createElement("td");
    tdName = document.createElement("td");
    tdEmail = document.createElement("td");
    tdAction = document.createElement("td");
    //
    
    tdAction.style.textAlign="center";//criação da célula dos botões

    //criação dos botões
    btnEdit = document.createElement('button');
    btnEdit.textContent = "Editar";
    btnEdit.setAttribute("class","edit")
    btnEdit.style.marginRight="5px";

    btnDel = document.createElement('button');
    btnDel.textContent = "Excluir";
    //

    //colocar botões na célula
    tdId.innerHTML = data.id;
    tdName.innerHTML = data.name;
    tdEmail.innerHTML = data.email;
    tdAction.appendChild(btnEdit);
    tdAction.appendChild(btnDel);
    //

    //colocar as células na linha da tabela
    line.appendChild(tdId);
    line.appendChild(tdName);
    line.appendChild(tdEmail);
    line.appendChild(tdAction);
    //

    btnDel.onclick = function(){//chama a função para deletar usando id como parâmetro
        var _delete = window.confirm("Tem certeza que deseja excluir "+data.name+"?");//confirmar a escolha
        if(_delete){
            deleteData(data.id,data.name);
        }

    };

    btnEdit.onclick = function(){//chamar função update com os dados como parâmetro
        id = data.id;
        name = data.name;
        email = data.email;
        gender = data.gender;
        status = data.status;
        loadInputData(id,name,email,gender,status);
        modalUpdate.style.display = "block";
    };
    
    return line;
}

async function deleteData(id,name){
    const response = await fetch('https://gorest.co.in/public/v2/users/'+id, {//delete request
        method: 'DELETE', 
        headers: {
            Authorization: 'Bearer 341c8f348e9b8d334010b09cf4f864f1c3880b2a7871ec9e6a0fb97e20f8680b',
        },
    });

    //verificação e retorno ao usuário de alguns status da request(erro, sucesso...)
    if(response.status==204){
        alert(name+" foi excluído(a) com sucesso!!");
        window.location.reload();
    }
    if(response.status==404){
        alert("Não foi possivel encontrar esse usuário, talvez ele ja tenha sido escluido!");
        window.location.reload();
    }
    if(response.status==429){
        alert("Você tentou fazer muitas exclusões em um curto período de tempo, tente novamente mais devagar.");
    }
    if(response.status==500){
        alert("Erro interno da API.");
    }
    //
}