window.addEventListener("load", () => {
  var arr = [];

  //lê textarea e sorteia as partidas
  document.querySelector("#sort").addEventListener("click", () => {
    var resul = listScore(ReadTeams(GetTeams()));
    arr.push(resul);
    console.log(arr);
  });
  //mostra resultados ocultos
  document.querySelector("#results").addEventListener("click", () => {
    resultsShow(GetTeams());
  });

  //mostra vencedor do campenato na tela
  document.querySelector("#winner").addEventListener("click", () => {
    electsWinner(arr[0]);
  });
});

//função para ler o textarea
function GetTeams() {
  const getTeams = document.querySelector("#teams").value;

  const Teams = [];

  var pivot = 1000;
  var charTeam = "";
  var charState = "";
  for (var i = 0; i < getTeams.length; i++) {
    //incrementa as palavras de times em uma variavel
    if (getTeams[i] != ";" && pivot == 1000) {
      charTeam += getTeams[i];
    } else {
      pivot = i;
    }

    //incrementa as palavras de estado em uma variavel
    if (pivot == i && getTeams[i] != "\n") {
      getTeams[i + 1] != undefined ? (charState += getTeams[i + 1]) : 0;
    } else {
      pivot = 1000;
    }

    //Após os elementos serem lidos são adicionados ao objeto
    //utilizando a quebra de linha \n como pivô
    if (getTeams[i] == "\n" || getTeams[i + 1] == undefined) {
      Teams.push({ time: charTeam, estado: charState });
      charTeam = "";
      charState = "";
    }
  }

  return Teams;
}

//função para sortear as rodadas
function ReadTeams(Games) {
  var result = document.querySelector("#res");
  var qtde = Games.length / 2;
  var length = Games.length - 1;
  var results = [];
  const secondround = [];

  //Sorteia primeira rodada e printa na tela
  //fonte: https://pt.wikipedia.org/wiki/Competi%C3%A7%C3%B5es_de_todos_contra_todos

  const handleVerifyFirst = verifyRound(Games, qtde, "Primeiro Turno");

  var roundDouble = " ";

  for (var i = 0; i < qtde; i++) {
    let round_result = setResults();

    handleVerifyFirst == Games[i].estado
      ? (roundDouble = "(Rodada Dupla)")
      : (roundDouble = " ");

    result.innerHTML += `<p>${Games[i].time} vs ${Games[length - i].time} -
     ${Games[i].estado} - Rodada 1 ${roundDouble}</p> 
     <p id="rodada_1${i}">${round_result[0]} x ${round_result[1]}</p>`;

    document.getElementById(`rodada_1${i}`).setAttribute("hidden", "hidden");

    results.push({
      time_1: Games[i].time,
      resul_1: round_result[0],
      score_1: Number,
      time_2: Games[length - i].time,
      resul_2: round_result[1],
      score_2: Number,
    });
  }

  //Sorteia segunda rodada o primeiro time é pivô
  secondround.push({ time: Games[0].time, estado: Games[0].estado });
  secondround.push({ time: Games[length].time, estado: Games[length].estado });

  for (var i = 1; i < Games.length; i++) {
    if (i != Games.length - 1) {
      secondround.push({ time: Games[i].time, estado: Games[i].estado });
    }
  }

  const handleVerifySecond = verifyRound(secondround, qtde, "Primeiro Turno");

  //printa segunda rodada na tela
  for (var i = 0; i < qtde; i++) {
    let round_result = setResults();

    handleVerifySecond == secondround[i].estado
      ? (roundDouble = "(Rodada Dupla)")
      : (roundDouble = " ");

    result.innerHTML += `<p> ${secondround[i].time} vs 
  ${secondround[length - i].time} - ${
      secondround[i].estado
    } - Rodada 2 ${roundDouble}</p>
    <p id="rodada_2${i}">${round_result[0]} x ${round_result[1]}</p>`;

    document.getElementById(`rodada_2${i}`).setAttribute("hidden", "hidden");

    results.push({
      time_1: secondround[i].time,
      resul_1: round_result[0],
      score_1: Number,
      time_2: secondround[length - i].time,
      resul_2: round_result[1],
      score_2: Number,
    });
  }

  //jogos de returno
  result.innerHTML += `<h3>Jogos de Returno</h3>`;

  const handleVerifyReturnFirst = verifyRound(Games, qtde, "Returno");

  for (var i = 0; i < qtde; i++) {
    let round_result = setResults();

    handleVerifyReturnFirst == Games[length - i].estado
      ? (roundDouble = "(Rodada Dupla)")
      : (roundDouble = " ");

    result.innerHTML += `<p> ${Games[length - i].time} vs ${Games[i].time}  
     - ${Games[length - i].estado} - Rodada 3 ${roundDouble} </p>
    <p id="rodada_3${i}">${round_result[0]} x ${round_result[1]}</p>`;

    document.getElementById(`rodada_3${i}`).setAttribute("hidden", "hidden");

    results.push({
      time_1: Games[length - i].time,
      resul_1: round_result[0],
      score_1: Number,
      time_2: Games[i].time,
      resul_2: round_result[1],
      score_2: Number,
    });
  }

  const handleVerifyReturnSecond = verifyRound(secondround, qtde, "Returno");
  for (var i = 0; i < qtde; i++) {
    let round_result = setResults();

    handleVerifyReturnSecond == secondround[length - i].estado
      ? (roundDouble = "(Rodada Dupla)")
      : (roundDouble = " ");

    result.innerHTML += `<p> ${secondround[length - i].time} vs
     ${secondround[i].time}  - ${
      secondround[length - i].estado
    } - Rodada 4 ${roundDouble}</p>
    <p id="rodada_4${i}">${round_result[0]} x ${round_result[1]} </p>`;

    document.getElementById(`rodada_4${i}`).setAttribute("hidden", "hidden");

    results.push({
      time_1: secondround[length - i].time,
      resul_1: round_result[0],
      score_1: Number,
      time_2: secondround[i].time,
      resul_2: round_result[1],
      score_2: Number,
    });
  }
  return results;
}

//faz verificação de rodada dupla

function verifyRound(arr, qtde, control) {
  var length = arr.length - 1;
  var listStates = [];

  if (control == "Primeiro Turno") {
    for (var i = 0; i < qtde; i++) {
      listStates.push(arr[i].estado);
      console.log(listStates);
    }
  } else {
    listStates = [];
    for (var i = 0; i < qtde; i++) {
      listStates.push(arr[length - i].estado);
    }
  }

  var verify = 0;
  var indicator = "";
  for (var i = 0; i < listStates.length; i++) {
    verify = 0;
    for (var j = 0; j < listStates.length; j++) {
      if (listStates[i] == listStates[j]) {
        verify++;
        if (verify == 2) {
          indicator = listStates[i];
        }
      }
    }
  }

  return [indicator];
}

//Gera resultados aleatórios da partida
function setResults() {
  var team_1 = Math.floor(Math.random() * (6 + 1));
  var team_2 = Math.floor(Math.random() * (6 + 1));

  return [team_1, team_2];
}

//mostra resultados na tela
function resultsShow(Games) {
  var qtde = Games.length / 2;

  for (var i = 0; i < qtde; i++) {
    document.getElementById(`rodada_1${i}`).removeAttribute("hidden");
    document.getElementById(`rodada_2${i}`).removeAttribute("hidden");
    document.getElementById(`rodada_3${i}`).removeAttribute("hidden");
    document.getElementById(`rodada_4${i}`).removeAttribute("hidden");
  }
}
//adiciona pontuação dos times ao array de objetos e imprime na tela
function listScore(results) {
  var verify = [];
  var listScore = [];
  var acm = 0;

  for (var i = 0; i < results.length; i++) {
    if (results[i].resul_1 > results[i].resul_2) {
      results[i].score_1 = 3;
      results[i].score_2 = 0;
    }
    if (results[i].resul_1 == results[i].resul_2) {
      results[i].score_1 = 1;
      results[i].score_2 = 1;
    }
    if (results[i].resul_1 < results[i].resul_2) {
      results[i].score_2 = 3;
      results[i].score_1 = 0;
    }
  }

  Object.keys(results).forEach(function (item) {
    listScore.push({
      team: results[item].time_1,
      score: results[item].score_1,
    });
    listScore.push({
      team: results[item].time_2,
      score: results[item].score_2,
    });
  });

  for (var i = 0; i < listScore.length; i++) {
    var list_team = listScore[i].team;
    var controller = 0;

    if (verify.length > 0) {
      controller = verify.find((el) => el.team === list_team);
    }
    if (controller == 0 || controller == undefined) {
      for (var j = 0; j < listScore.length; j++) {
        if (list_team == listScore[j].team) {
          acm += listScore[j].score;
        }
      }

      verify.push({ team: list_team, score: acm });
      acm = 0;
    }
  }
  console.log(verify);
  return verify;
}

//verifica time com pontuação maior no campeonato
function electsWinner(arr) {
  var winner = document.querySelector("#res");
  const max = arr.reduce(function (prev, current) {
    return prev.score > current.score ? prev : current;
  });

  winner.innerHTML += `<h3>Time Vencedor ${max.team} com ${max.score} pontos</h3>`;

  console.log(max);
}

console.log("Caso não apareçam as rodadas duplas leia linha 311 no arquivo js");

/* Caso não apareçam as rodadas duplas no navegador clique em f12 e abra
 o console do navegador e verá que possui espaço entre o caractere e o 
 estado Ex: Rio de Janeiro ↵ em seguida no textarea apague os espaços, 
 e no console deve ficar assim  Ex:Rio de Janeiro↵,
 porque o espaço é lido no array e atrapalha na verificação*/
