document.addEventListener("DOMContentLoaded", function(){

	/***			PARTIAL RENDER!!!			***/
	/*	Esta función realiza el PARTIAL RENDER que carga en la sección "cuerpo" del index.	*/
	function loadHome(event){
		event.preventDefault();
		let container = document.querySelector(".cuerpo");
		container.innerHTML = "<h2>Cargando...</h2>";
		fetch("home.html").then(
			function(response){
		      		response.text().then(t  => {
						container.innerHTML = t;
						container.querySelectorAll(".js-loadMatriz")[0].addEventListener("click", loadMatriz);})
					.catch(error => console.log("Error en loadHome, text(): "+error))
					})
			.catch(error => console.log("Error en loadHome: "+error))
	}

	/*	Carga inicial del HOME de la página.	*/
	window.onload = loadHome;
	
	/*	Event Listeners de la botonera principal.	*/
	let jsjuegos = document.querySelectorAll(".js-juegos");
	jsjuegos.forEach(e=> e.addEventListener("click", loadHome));

	function loadMatriz(event){
		event.preventDefault();
		let filas = document.querySelector("#inputEstj1").value;
		let columnas = document.querySelector("#inputEstj2").value;
		console.log("estrategias para J1: "+ filas);
		console.log("estrategias para J2: "+ columnas);
		let container = document.querySelectorAll(".matriz")[0];
		let cantHijos = container.childNodes.length;
		/*borro las posibles matrices anteriores*/
		for (let i = 0; i < cantHijos; i++) 
			container.removeChild(container.firstChild);
		let colTr = document.createElement("thead");
		/*creo el thead*/
		for (let k = 0; k <= columnas; k++) {
			let colId = document.createElement("th");
			let contenidoId;
			if (k == 0)
				contenidoId = document.createTextNode("");
			else
				contenidoId = document.createTextNode("B"+k);
			colId.appendChild(contenidoId);
			colTr.appendChild(colId);
		}
		container.appendChild(colTr);
		/*creo toda la tabla*/
		for (let i = 1; i <= filas; i++) {
			let colTr = document.createElement("tr");
			for (let j = 0; j <= columnas; j++) {
				let colId = document.createElement("td");
				let contenido;
				let contenidoId;
				if (j == 0) {
					contenido = "A"+(i);
					contenidoId = document.createTextNode(contenido);
					colId.setAttribute("class", "thead");
				}
				else{
					contenidoId = document.createElement("input");
					contenidoId.setAttribute("id", "posicion"+i+j);
				}
				colId.appendChild(contenidoId);
				colTr.appendChild(colId);		
			}
			container.appendChild(colTr);
		}
		let botonGenerarGrafico = document.createElement("button");
		let cont = document.createTextNode("Generar grafico");
		botonGenerarGrafico.appendChild(cont);
		botonGenerarGrafico.setAttribute("id", "js-generarGrafico");
		//setTimeout(function(){ 
			container.appendChild(botonGenerarGrafico);
			botonGenerarGrafico.addEventListener("click", resolvente);
		//}, 30);
	}

	function resolvente(event){
		event.preventDefault();
		let filas = document.querySelector("#inputEstj1").value;
		let columnas = document.querySelector("#inputEstj2").value;
		let mat = [];
		let aux = 0;
		for (let i = 1; i <= filas; i++) {
			for (let j = 1; j <= columnas; j++) {
				let elemento = document.querySelector("#posicion"+i+j);
				let pos = parseInt(aux)+parseInt(j-1);
				mat[pos] = elemento.value;
			}
			aux = aux + parseInt(columnas);	
		}
		dominadasRecursivas(mat, filas, columnas);
	}

	function dominadasRecursivas(matriz, filas, columnas){
		let sinDominadas = [];
		let indice = 0;
		console.log("filas: " + filas + ", columnas: " + columnas);
		for (let x = 0; x < filas; x++) {
			for (let y = 0; y < columnas; y++) {
				console.log("como matriz: [" + indice + "][" + y + "]: " + matriz[parseInt(indice+y)]);
			}
			indice = indice + parseInt(columnas);	
		}
		sinDominadas = sinDominadasPorFila(matriz, filas, columnas);
		let filaDominada = -1;
		let matReducida = [];
		let cantFilasDom = 0;
		let maxFilas = document.querySelector("#inputEstj1").value;
		let maxColumnas = document.querySelector("#inputEstj2").value;
		for (let i = 0; i < filas; i++) {
			for (let j = 1; j <= columnas; j++) {
				let fila = i+1;
				let elem = document.querySelector("#posicion"+fila+j);
				if (!sinDominadas[i]){
					console.log("fila dominada: " + i);
					filaDominada = i;
					if(j==columnas)
						cantFilasDom = parseInt(cantFilasDom) + parseInt(1);
					if (!elem.classList.contains("eliminada"))
						elem.classList.add("class", "eliminada");
				}
				else{
					matReducida.push(elem.value);
				}				
			}
			console.log("sin dom["+i+"]: "+sinDominadas[i]);
		}
		for (let x = filas; x < maxFilas; x++) {
			for (let y = columnas; y < maxColumnas; y++) {
				let elem = document.querySelector("#posicion"+x+y);
				if (!elem.classList.contains("eliminada"))
					elem.classList.add("class", "eliminada");
			}
		}

		let filasRed = filas - cantFilasDom;
		/*for (let i = 0; i < matReducida.length; i++) 
			console.log("mat red "+matReducida[i]);*/
		if (cantFilasDom > 0)
			dominadasRecursivas(matReducida, filasRed, columnas);
		else{
			sinDominadas = sinDominadasPorColumna(matriz, filas, columnas);
			let colDominada = -1;
			matReducida = [];
			let cantColumnasDom = 0;
			for (let i = 0; i < columnas; i++) {
				for (let j = 1; j <= filas; j++) {
					let col = i+1;
					let elem = document.querySelector("#posicion"+j+col);
					if (!sinDominadas[i]){
						console.log("columna dominada: " + i);
						colDominada = i;
						if(j == filas)
							cantColumnasDom = parseInt(cantColumnasDom) + parseInt(1);
						elem.classList.add("class", "eliminada");
					}
					else{
						matReducida.push(elem.value);
					}				
				}
				console.log("sin dom["+i+"]: "+sinDominadas[i]);
			}
			let columnasRed = columnas - cantColumnasDom;
			
			let matOrdenada = [];
			let indiceOrdenado = 0;
			
			for (let x = 0; x < filasRed; x++) {
				for (let y = 0; y < columnasRed; y++) {
					matOrdenada.push(matReducida[parseInt(x+y*columnasRed)]);
					//console.log("como matrizFINAL : [" + indiceOrdenado + "][" + y + "]: " + matOrdenada[parseInt(indiceOrdenado+y)]);
				}
				indiceOrdenado = indiceOrdenado + parseInt(columnas);	
			}
			if (cantColumnasDom > 0)
				dominadasRecursivas(matOrdenada, filasRed, columnasRed);
		}

	}

	function sinDominadasPorFila(matriz, filas, columnas){
		let esMenor = true;
		let esMayor = true;
		let resultado = [];
		let aux = 0;
		let aux2 = columnas;
		for (let a = 0; a < filas; a++) 
			resultado[a] = true;
		for (let i = 1; i <= filas-1; i++) {
			aux2 = parseInt(aux) + parseInt(columnas); //creo que tendria que iniciarlo afuera del for
			for (let k = i+1; k <= filas; k++) {
				esMenor = true;
				esMayor = true;
				for (let j = 1; j <= columnas; j++) {
					let valor1 = parseInt(aux)+parseInt(j-1);
					let valor2 = parseInt(aux2)+parseInt(j-1);
					//console.log("comparo: " + valor1 + ", con: " + valor2 + ". En la mat: " + matriz[valor1] +", con " + matriz[valor2]);
					
					if (parseInt(matriz[valor1]) > parseInt(matriz[valor2])) {
						esMenor = false;
						console.log("es mayor [" + aux + "][" +parseInt(j-1) + "], respecto a la siguiente fila");
					}
					if (parseInt(matriz[valor1]) < parseInt(matriz[valor2])) {
						esMayor = false;
						console.log("es menor [" + aux + "][" + parseInt(j-1) + "], respecto a la siguiente fila");
					}
				}
				aux2 = parseInt(aux2) + parseInt(columnas);
				if (esMenor) {
					let indice = i-1; //la menor es dominada
					resultado[indice] = false;//"dominada"
				}
				if (esMayor){
					let indice = k-1; //la menor es dominada
					resultado[indice] = false;//"dominada"
					
				}
			}
			aux = parseInt(aux) + parseInt(columnas);
		}
		return resultado;
	}

	function sinDominadasPorColumna(matriz, filas, columnas){
		let esMenor = true;
		let esMayor = true;
		let resultado = [];
		let aux = 0;
		let aux2 = columnas;
		for (let i = 1; i <= filas; i++) {
			for (let j = 1; j <= columnas; j++) {
				let pos = parseInt(aux)+parseInt(j-1);
				console.log("mi mat: "+matriz[pos]);
			}
			aux = parseInt(aux) + parseInt(columnas);
		}
		aux = 0;
		console.log("columnasssss");
		for (let a = 0; a < columnas; a++) 
			resultado[a] = true;
		for (let i = 1; i <= columnas-1; i++) {
			aux2 = parseInt(aux) + 1; 
			for (let k = i+1; k <= columnas; k++) {
				esMenor = true;
				esMayor = true;
				for (let j = 1; j <= filas; j++) {
					let valor1 = parseInt(aux)+parseInt((j-1)*parseInt(columnas));
					let valor2 = parseInt(aux2)+parseInt((j-1)*parseInt(columnas));
					console.log("comparo: " + valor1 + ", con: " + valor2 + ". En la mat: " + matriz[valor1] +", con " + matriz[valor2]);
					
					if (parseInt(matriz[valor1]) > parseInt(matriz[valor2])) {
						esMenor = false;
						console.log("es mayor [" + parseInt(j-1) + "][" + aux +"], respecto a la siguiente columna");
					}
					if (parseInt(matriz[valor1]) < parseInt(matriz[valor2])) {
						esMayor = false;
						console.log("es menor [" + parseInt(j-1) + "][" + aux +"] , respecto a la siguiente columna");
					}
				}
				aux2 = parseInt(aux2) + 1; 
				if (esMenor) {
					let indice = k-1; //la mayor es dominada
					resultado[indice] = false;//"dominada"
					console.log("col[" + indice + "] dominada");
				}
				if (esMayor){
					let indice = i-1; //la mayor es dominada
					resultado[indice] = false;//"dominada"
					console.log("col[" + indice + "] dominada");
				}
			}
			aux = parseInt(aux) +1;
		}
		return resultado;
	}

	/***			PARTIAL RENDER!!!			***/
	/*	Esta función realiza el PARTIAL RENDER que cargar el canvas. No se llama nunca, porque por ahora se llama desde index	*/
	function loadJuegos(event){
		event.preventDefault();
		let container = document.querySelector(".cuerpo");
		container.innerHTML = "<h2>Cargando...</h2>";
		fetch("juegos.html").then(
			function(response){
		      		response.text().then(t  => 
						container.innerHTML = t)
					.catch(error => console.log("Error en loadHome, text(): "+error))
					})
			.catch(error => console.log("Error en loadHome: "+error))
	}

	/*	Carga inicial del HOME de la página.	*/
	/*window.onload = loadJuegos;*/
	
	/*	Event Listeners de la botonera principal.	*/
	/*let jsjuegos = document.querySelectorAll(".js-juegos");
	jsjuegos.forEach(e=> e.addEventListener("click", loadJuegos));*/
})