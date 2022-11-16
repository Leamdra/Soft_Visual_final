class Equipamento {
    constructor(){
        this.id = 1;
        this.arrayEquipamentos = [];
        this.editd = null;
    }

    salvar(){
        let equipamento = this.lerDados();

        if(this.validaCampo(equipamento) == true){
            if(this.editId == null) {
                this.adicionar(equipamento);
            }else{
                this.atualizar(this.editId, equipamento)
            }
            this.adicionar(equipamento);
        }

        this.listaTabela();
        this.excluir();
    }

    listaTabela(){
        let tbody   = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayEquipamentos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_equipamento = tr.insertCell();
            let td_instalação = tr.insertCell();
            let td_ações = tr.insertCell();

            td_id.innerText = this.arrayEquipamentos[i].id;
            td_equipamento.innerText = this.arrayEquipamentos[i].equipamento;
            td_instalação.innerText = this.arrayEquipamentos[i].instalação;
        
            td_id.classList.add('center')
        
            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick" , "equipamento.editar("+ JSON.stringify(this.arrayEquipamentos[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/botao-apagar.png';
            imgDelete.setAttribute("onclick" , "equipamento.deletar("+ this.arrayEquipamentos[i].id +")");

            td_ações.appendChild(imgEdit);
            td_ações.appendChild(imgDelete);
        }
    }

    adicionar(equipamento){
        this.arrayEquipamentos.push(equipamento);
        this.id++;
    }

    atualizar(id, equipamento){
        for (let i = 0; i < this.arrayEquipamentos.length; i++){
            if(this.arrayEquipamentos[i].id == id){
                this.arrayEquipamentos[i].equipamento = equipamento.equipamento;
                this.arrayEquipamentos[i].equipamento = equipamento.instalação;
            }
        }
    }

    editar(dados){
        this.editId = dados.id;

        document.getElementById('equipamento').value = dados.equipamento;
        document.getElementById('instalação').value = dados.instalação;

        document.getElementById('btn1').innerText = 'Atualizar'
    }

    lerDados(){
        let equipamento = {}

        equipamento.id = this.id;
        equipamento.equipamento = document.getElementById('equipamento').value;
        equipamento.instalação = document.getElementById('instalação').value;
    
        return equipamento;
    
    }

    validaCampo(){
        let msg = '';

        if(equipamento.equipamento == ' '){
        msg += '- Informe o nome do equipamento \n';
        }

        if(equipamento.instalação == ''){
            msg += '- Informe o local de instalação \n';
        }

        if(msg != ''){
            alert(msg);
            return false
        }

        return true;

    }

    excluir(){
        document.getElementById('equipamento').value = '';
        document.getElementById('instalação').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null ;


    }

    deletar(id){

        if(confirm('Deseja realmente deletar o equipamento do ID' + id)){
            let tbody = document.getElementById('tbody');

                for( let i = 0 ; i < this.arrayEquipamentos.length; i++){
                    if(this.arrayEquipamentos[i].id == id) {
                        this.arrayEquipamentos.splice(i, 1);
                        tbody.deleteRow(i);
                    }
                }       
            console.log(this.arrayEquipamentos);
        }
       
    }
}

var equipamento = new Equipamento();
