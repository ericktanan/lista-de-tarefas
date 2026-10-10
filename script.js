const botao = document.getElementById("adicionar");
const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");
const botaoCalendario = document.getElementById("toggle-calendario");
const tarefas = []
const colunas = document.querySelectorAll(".dia-coluna");
let tarefaSelecionada = null;
let itemSelecionado = null;


colunas.forEach((coluna) => {
  coluna.addEventListener("dragover", (event) => {
    
    event.preventDefault(); // lembra: sem isso o "drop" nem dispara
  });

  coluna.addEventListener("drop", () => {
    coluna.appendChild(itemSelecionado);
    console.log("O DROP DISPAROU!");
    tarefaSelecionada.dia = coluna.dataset.dia;
     itemSelecionado.querySelector("button").innerText = "Remover"
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  });
});


if(localStorage.getItem("tarefas") === null){

}
else{
  const dados = localStorage.getItem("tarefas")
const tarefasSalvas = JSON.parse(dados)

tarefas.push(...tarefasSalvas)

for( let i = 0; i < tarefasSalvas.length; i++){
  criarTarefa(tarefasSalvas[i])
}
}
input.addEventListener("keydown", function (event) {
  if( event.key === "Enter"){
    botao.click();
  }
});
botaoCalendario.addEventListener("click", () => {   // ← e isso também pra cá, fora da função
    document.body.classList.toggle("calendario-aberto");
})

botao.addEventListener("click", function () {
    
    
    
      if( input.value.trim() === ""){
      return
 }
    if( input.value.trim().length > 20){
      alert("A tarefa pode ter no máximo 20 caracteres.")
    return
    }
    if( tarefas.length >= 10){
      alert('Você atingiu o limite de tarefas!\nQue vida puxada, hein?'
      ); return
    }
    
    
    const tarefa = {
    texto: input.value.trim(),
    concluida: false,
    dia: null}
    tarefas.push(tarefa)
    
    
    criarTarefa(tarefa)
 const dados = JSON.stringify(tarefas)
localStorage.setItem("tarefas", dados);

    
input.value = ""







});

function criarTarefa(tarefa){
  const item = document.createElement("li");
  const excluir = document.createElement("button")
  const texto = document.createElement("span");
  item.setAttribute("draggable", "true");

item.addEventListener("dragstart", () => {
    tarefaSelecionada = tarefa;
    itemSelecionado = item;
  });
    texto.innerText = tarefa.texto


if(tarefa.concluida){
texto.classList.toggle("concluida")
}
item.addEventListener("click", () => {
    tarefa.concluida = !tarefa.concluida
texto.classList.toggle("concluida")

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

  });

item.addEventListener("contextmenu", (event) => {event.preventDefault();
  excluir.classList.toggle("excluir")  
})
    excluir.addEventListener("click", function (event) {
    event.stopPropagation()

    if(tarefa.dia){
        // está no calendário → volta pro banco, não apaga
        tarefa.dia = null;
        lista.appendChild(item);
       if(tarefa.dia){
    excluir.innerText = "Remover";
} else {
    excluir.innerText = "Excluir";
}
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    } else {
        // está na lista normal → comportamento de sempre
        const indice = tarefas.indexOf(tarefa)
        item.remove();
        tarefas.splice(indice, 1)
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
})
excluir.classList.add("excluir");
if(tarefa.dia){
    excluir.innerText = "Remover";
} else {
    excluir.innerText = "Excluir";
}
if(tarefa.dia){
    const colunaCerta = document.querySelector(`.dia-coluna[data-dia="${tarefa.dia}"]`);
    colunaCerta.appendChild(item);
} else {
    lista.appendChild(item);
}
item.appendChild(texto);
item.appendChild(excluir);
    }
