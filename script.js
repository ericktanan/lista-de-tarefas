const botao = document.getElementById("adicionar");
const input = document.getElementById("tarefa");
const lista = document.getElementById("lista");
const tarefas = []
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


botao.addEventListener("click", function () {
    
    
    
      if( input.value.trim() === ""){
      return
 }
    if( input.value.trim().length > 20){
      alert("A tarefa pode ter no máximo 20 caracteres.")
    return
    }
    const tarefa = {
    texto: input.value.trim(),
    concluida: false}
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
      const indice = tarefas.indexOf(tarefa)
      
      event.stopPropagation()
      item.remove();;
      tarefas.splice(indice, 1)
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
    })
      excluir.innerText = "Excluir";
excluir.classList.add("excluir");

lista.appendChild(item);
item.appendChild(texto);
item.appendChild(excluir);
    }
