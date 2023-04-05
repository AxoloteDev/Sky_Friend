// Acsses Key from Open Weather MAp
const key = "e2283c0887b6da1b5aa90f09074d9a48";

// Acsses Key from OpenCage
const geoKey = "b7515ebecf584d20b6e31d56faaff3ab";

const uvKey = "openuv-7c2uarlffg6nly-io";

const body = document.querySelector("body");

const loading = document.querySelector("#loading");

const errorDiv = document.querySelector("#error");
const errorMensage = document.querySelector("#errorMensage");

const divWeather = document.querySelector("#weather");
const country = document.querySelector("#country");
const cityName = document.querySelector("#city");
const data = document.querySelector("#data");
const icon = document.querySelector("#current-weather");
const weather = document.querySelector("#weather-name");
const info = document.querySelector("#description");

const temp = document.querySelector("#temp");
const feels = document.querySelector("#feels");

const maxTemp = document.querySelector("#max-temp");
const minTemp = document.querySelector("#min-temp");

const tip = document.querySelector("#tip");

// Error code for Geolocalization API
function showError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			loading.style.display = "none";
			errorDiv.style.display = "block";
			errorMensage.innerHTML = "Usuário negou a solicitação de geolocalização";
			break;
		case error.POSITION_UNAVAILABLE:
			loading.style.display = "none";
			errorDiv.style.display = "block";
			errorMensage.innerHTML = "A posição não está disponível";
			break;
		case error.TIMEOUT:
			loading.style.display = "none";
			errorDiv.style.display = "block";
			errorMensage.innerHTML = "Tempo limite para obter a localização esgotado";
			break;
		case error.UNKNOWN_ERROR:
			loading.style.display = "none";
			errorDiv.style.display = "block";
			errorMensage.innerHTML = "Erro desconhecido";
			break;
	}
}

// Variable for configuration of Geolocalization API
let geoConfigs = {
	enableHighAccuracy: true,
	timeout: 15000,
	maximumAge: 0,
};

// Crate Geolocation API
navigator.geolocation.getCurrentPosition(
	function (position, lat, lon) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;

		// Url to acsses open weather map API
		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=pt`;

		// Url to acsses open cage data API
		const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoKey}&language=pt-BR`;

		// Url to acsses openUV API
		const openuvUrl = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`;

		const nextDaysopenweathermapUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=pt`;

		// Create a request from open weather map
		async function getWeather() {
			loading.style.display = "block";
			try {
				const response = await fetch(weatherUrl);
				const data = await response.json();
				console.log(data);
				const description = data.weather[0].description;
				const formatedDescription =
					description.slice(0, 1).toUpperCase() + description.substr(1, 1000);
				let id = Number(data.weather[0].id);

				// Create a request from OpenCage
				async function getLocal() {
					const responseLocal = await fetch(openCageUrl);
					const dataLocal = await responseLocal.json();

					country.innerHTML = dataLocal.results[0].components.country;
					cityName.innerText =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;
				}
				getLocal();

				// Url to acsses openUV API
				async function getUV() {
					const response = await fetch(openuvUrl, {
						headers: {
							"x-access-token": uvKey,
						},
					});
					const data = await response.json();

					const formatedUV = String(data.result.uv).slice(0, 1);
					document.querySelector("#uv").innerHTML = formatedUV;
				}
				getUV();

				// change style basead on weather
				function weatherCondition() {
					switch (data.weather[0].main) {
						// Rain
						case "Rain":
							body.style.backgroundImage =
								"linear-gradient(160deg, #003760 60%, #00000073)";
							body.style.backgroundColor = "#003760";
							weather.innerHTML = "Chuva";
							info.innerHTML = formatedDescription;
							tip.innerHTML =
								"Um dia chuvoso pode parecer desanimador, mas há várias atividades que você pode fazer para aproveitar o tempo dentro de casa. Uma opção é se dedicar a atividades relaxantes, como ler um livro, assistir um filme ou série, ouvir música ou meditar. Se você está acompanhado, jogar jogos de tabuleiro ou cartas pode ser divertido. Outra ideia é se dedicar a alguma atividade criativa, como pintar, desenhar, costurar ou fazer artesanato. Aproveite o clima aconchegante para cozinhar uma refeição especial ou experimentar uma nova receita. E se você está se sentindo ativo, tente praticar exercícios em casa, como ioga, pilates ou treinos com pesos livres. O importante é encontrar algo que te faça feliz e aproveitar o tempo de descanso para cuidar de si mesmo.";
							switch (id) {
								case 501:
									icon.setAttribute("src", "/imgs/clima/chuva.png");
									break;
								case 500:
									icon.setAttribute("src", "/imgs/clima/chuva.png");
									break;
								case 502:
									icon.setAttribute("src", "/imgs/clima/chuva.png");
									break;
								case 503:
									icon.setAttribute("src", "/imgs/clima/chuva.png");
									break;
								case 511:
									icon.setAttribute("src", "/imgs/clima/chuva de gelo.png");
									body.style.backgroundImage =
										"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
									break;
								case 520:
									icon.setAttribute("src", "/imgs/clima/chuva fraca.png");
									break;
								case 521:
									icon.setAttribute("src", "/imgs/clima/chuva fraca.png");
									break;
								case 522:
									icon.setAttribute("src", "/imgs/clima/chuva fraca.png");
									break;
								case 531:
									icon.setAttribute("src", "/imgs/clima/chuva fraca.png");
									break;
							}
							break;
						// Clouds
						case "Clouds":
							body.style.backgroundImage =
								"linear-gradient(160deg, #2D00FF 60%, #00000073)";
							body.style.backgroundColor = "#2D00FF";
							weather.innerHTML = "Céu com Nuvens";
							info.innerHTML = formatedDescription;
							tip.innerHTML =
								"Um dia nublado não precisa ser um dia chato. Você pode aproveitar o tempo para fazer atividades ao ar livre, como caminhar ou andar de bicicleta, ou mesmo praticar um esporte. Se preferir ficar em casa, pode se dedicar a atividades que não exigem muito sol, como ler um livro, assistir um filme, cozinhar ou fazer algo criativo, como desenhar ou pintar. Se estiver acompanhado, jogos de tabuleiro ou cartas são uma ótima opção. Não deixe o clima influenciar seu humor e encontre algo que te faça feliz";
							switch (id) {
								case 801:
									icon.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
									body.style.backgroundImage =
										"linear-gradient(160deg, #FE980D 92%, #00000073)";
									body.style.backgroundColor = "#FE980D";
									break;
								case 802:
									icon.setAttribute("src", "/imgs/clima/nuven.png");
									break;
								case 803:
									icon.setAttribute("src", "/imgs/clima/nublado.png");
									break;
								case 804:
									icon.setAttribute("src", "/imgs/clima/nublado.png");
									break;
							}
							break;
						// Drizzle
						case "Drizzle":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
							body.style.backgroundColor = "#0F4F7F";
							weather.innerHTML = "Chuvisco";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/chuvisco.png");
							tip.innerHTML =
								"Em um dia chuviscando, você pode aproveitar o clima mais ameno para fazer atividades ao ar livre com uma capa de chuva ou guarda-chuva, como caminhar, correr ou andar de bicicleta. Se preferir ficar em casa, pode se dedicar a atividades relaxantes, como ler um livro, ouvir música, meditar ou assistir um filme. Aproveite o tempo para fazer algo criativo, como escrever ou desenhar, ou cozinhar algo delicioso. Se estiver acompanhado, jogar jogos de tabuleiro ou cartas pode ser uma ótima opção para se divertir. Independentemente do que escolher, aproveite o dia para fazer algo que te faça feliz.";
							break;
						// Thunderstorm
						case "Thunderstorm":
							body.style.backgroundImage =
								"linear-gradient(160deg, #686284 60%, #00000073)";
							body.style.backgroundColor = "#686284";
							weather.innerHTML = "Tempestade";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/tempestade.png");
							tip.innerHTML =
								"Em um dia de tempestade, é importante priorizar sua segurança e ficar em um lugar seguro. Se possível, evite sair de casa. Use o tempo para se dedicar a atividades que não exigem eletricidade, como ler um livro, jogar jogos de tabuleiro, fazer artesanato ou cozinhar. Se você tem acesso à internet, pode aproveitar para assistir a um filme ou série, ouvir música ou fazer uma videochamada com amigos e familiares. Se a tempestade estiver muito forte e houver risco de queda de energia, é importante ter velas, lanternas e baterias extras à mão. Aproveite o tempo para relaxar e cuidar de si mesmo, e lembre-se de que a tempestade eventualmente passará.";
							break;
						// Snow
						case "Snow":
							body.style.backgroundImage =
								"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
							body.style.backgroundColor = "#6BB4D1";
							weather.innerHTML = "Nevando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/floco-de-neve.png");
							tip.innerHTML =
								"Em um dia de neve, aproveite o clima para fazer atividades divertidas ao ar livre, como esquiar, patinar no gelo ou fazer um boneco de neve. Se preferir ficar em casa, pode se dedicar a atividades acolhedoras, como beber um chocolate quente, ler um livro ou assistir a um filme. Aproveite o tempo para fazer algo criativo, como pintar ou desenhar, ou cozinhar algo que te aqueça, como sopa ou um ensopado. Se estiver acompanhado, jogar jogos de tabuleiro ou cartas pode ser uma ótima opção para se divertir. Independentemente do que escolher, aproveite o dia para fazer algo que te faça feliz e aprecie a beleza da neve.";
							break;
						// Mist, Smoke, Sand, Ash, Haze, Fog and others
						case "Mist":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia de neblina, aproveite a atmosfera misteriosa para se dedicar a atividades tranquilas e contemplativas. Pode ser um ótimo momento para meditar, fazer ioga ou praticar exercícios de respiração. Se preferir algo mais ativo, caminhe em um parque ou na natureza para apreciar a beleza da neblina e o silêncio que ela proporciona. Se estiver em casa, pode se dedicar a atividades criativas, como escrever, desenhar ou pintar. Se estiver acompanhado, pode jogar jogos de tabuleiro ou cartas ou cozinhar algo delicioso juntos. Independentemente do que escolher, aproveite o dia para se conectar consigo mesmo e com a natureza ao seu redor.";
							break;
						case "Smoke":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia com fumaça, é importante priorizar sua saúde e evitar atividades ao ar livre. Se possível, fique em um ambiente fechado com ar-condicionado e filtros de ar. Pode ser um ótimo momento para se dedicar a atividades internas e relaxantes, como ler um livro, meditar ou assistir a um filme. Se estiver acompanhado, jogar jogos de tabuleiro ou cartas pode ser uma opção divertida. Se precisar sair de casa, use uma máscara de proteção e evite esforços físicos excessivos. É importante ficar atento às recomendações das autoridades de saúde e tomar medidas de precaução para evitar problemas respiratórios.";
							break;
						case "Haze":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia de neblina, aproveite a atmosfera misteriosa para se dedicar a atividades tranquilas e contemplativas. Pode ser um ótimo momento para meditar, fazer ioga ou praticar exercícios de respiração. Se preferir algo mais ativo, caminhe em um parque ou na natureza para apreciar a beleza da neblina e o silêncio que ela proporciona. Se estiver em casa, pode se dedicar a atividades criativas, como escrever, desenhar ou pintar. Se estiver acompanhado, pode jogar jogos de tabuleiro ou cartas ou cozinhar algo delicioso juntos. Independentemente do que escolher, aproveite o dia para se conectar consigo mesmo e com a natureza ao seu redor.";
							break;
						case "Dust":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia com poeira, é importante cuidar da sua saúde e evitar atividades que possam piorar os sintomas respiratórios. Se possível, evite atividades ao ar livre e fique em um ambiente fechado com ar-condicionado e filtros de ar. Pode ser um bom momento para fazer atividades tranquilas e internas, como ler um livro, meditar ou assistir a um filme. Se estiver acompanhado, jogar jogos de tabuleiro ou cartas pode ser uma opção divertida. Se precisar sair de casa, use uma máscara de proteção e evite esforços físicos excessivos. É importante tomar medidas para evitar problemas respiratórios, como limpar a casa e os móveis com frequência e evitar deixar as janelas abertas. Fique atento às recomendações das autoridades de saúde e cuide bem de si mesmo.";
							break;
						case "Fog":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia de neblina, aproveite a atmosfera misteriosa para se dedicar a atividades tranquilas e contemplativas. Pode ser um ótimo momento para meditar, fazer ioga ou praticar exercícios de respiração. Se preferir algo mais ativo, caminhe em um parque ou na natureza para apreciar a beleza da neblina e o silêncio que ela proporciona. Se estiver em casa, pode se dedicar a atividades criativas, como escrever, desenhar ou pintar. Se estiver acompanhado, pode jogar jogos de tabuleiro ou cartas ou cozinhar algo delicioso juntos. Independentemente do que escolher, aproveite o dia para se conectar consigo mesmo e com a natureza ao seu redor.";
							break;
						case "Sand":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia com muita areia, é importante tomar precauções para proteger sua saúde. Evite atividades ao ar livre e, se precisar sair de casa, use roupas que cubram a maior parte do seu corpo e óculos de proteção. É importante também usar uma máscara de proteção para evitar a inalação de partículas de areia. Se possível, fique em um ambiente fechado com ar-condicionado e filtros de ar para minimizar a exposição à areia. Pode ser um bom momento para se dedicar a atividades internas, como ler um livro, meditar ou assistir a um filme. Se estiver acompanhado, jogar jogos de tabuleiro ou cartas pode ser uma opção divertida. Lembre-se de que é importante cuidar da sua saúde e evitar a exposição excessiva à areia. Fique atento às recomendações das autoridades de saúde e tome medidas para proteger a si mesmo e sua família.";
							break;
						case "Ash":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia com cinzas, é importante proteger sua saúde e evitar atividades ao ar livre. As cinzas podem ser tóxicas e irritantes para os olhos e as vias respiratórias. Se possível, fique em um ambiente fechado com ar-condicionado e filtros de ar para minimizar a exposição às cinzas. Pode ser um bom momento para se dedicar a atividades internas e relaxantes, como ler um livro, meditar ou assistir a um filme. Se estiver acompanhado, jogar jogos de tabuleiro ou cartas pode ser uma opção divertida. Se precisar sair de casa, use uma máscara de proteção e óculos de proteção para minimizar a exposição às cinzas. É importante limpar a casa e os móveis com frequência para remover as cinzas e evitar problemas respiratórios. Fique atento às recomendações das autoridades de saúde e cuide bem de si mesmo.";
							break;
						case "Squall":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia com rajadas de vento, é importante tomar medidas de precaução para evitar acidentes e proteger sua saúde. Evite atividades ao ar livre que possam expô-lo a objetos em movimento ou quedas, como caminhar em locais abertos ou andar de bicicleta. Se estiver dirigindo, dirija com precaução e mantenha as mãos no volante. Em casa, feche bem as janelas e portas para evitar que objetos sejam levados pelo vento. Se precisar sair de casa, use roupas adequadas para se proteger do vento e evite áreas com muitas árvores ou objetos soltos. Pode ser um bom momento para se dedicar a atividades internas, como ler um livro, meditar ou assistir a um filme. Fique atento às recomendações das autoridades de segurança e cuide bem de si mesmo.";
							break;
						case "Tornado":
							body.style.backgroundImage =
								"linear-gradient(160deg, #0AA591 60%, #00000073)";
							body.style.backgroundColor = "#0AA591";
							weather.innerHTML = "Ventando";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/vento.png");
							tip.innerHTML =
								"Em um dia com um tornado, é extremamente importante seguir as recomendações das autoridades de segurança e procurar abrigo imediatamente. Não saia de casa e procure um local seguro, como um porão ou um cômodo sem janelas, no centro da casa ou prédio. Se você está dirigindo, saia do carro imediatamente e busque um abrigo seguro. Evite áreas abertas ou próximas a janelas e objetos soltos que possam ser levados pelo vento. Fique atento às informações fornecidas pelas autoridades locais e siga as instruções de evacuação, se necessário. Lembre-se de que sua segurança é a prioridade. Não tente enfrentar o tornado e procure ajuda imediatamente se necessário.";
							break;
						// Clear Sky
						case "Clear":
							body.style.backgroundImage =
								"linear-gradient(160deg, #00A1FB 60%, #00000073)";
							body.style.backgroundColor = "#00A1FB";
							weather.innerHTML = "Céu Limpo";
							info.innerHTML = formatedDescription;
							icon.setAttribute("src", "/imgs/clima/sol.png");
							tip.innerHTML =
								"Em um dia ensolarado, há muitas atividades agradáveis para aproveitar o clima. Uma boa opção é praticar esportes ao ar livre, como caminhadas, corridas, natação, ciclismo ou jogar frisbee ou futebol. É importante usar protetor solar e beber bastante água para evitar problemas de pele e desidratação. Se preferir atividades mais relaxantes, você pode ler um livro em um parque, fazer um piquenique ou simplesmente desfrutar de uma bebida gelada enquanto aprecia a paisagem. Outras opções incluem visitar uma praia, um jardim botânico ou um zoológico. Aproveite o tempo ao ar livre, mas lembre-se de cuidar da sua saúde e segurança. Evite atividades ao ar livre em horários de pico de calor e sempre use proteção solar adequada.";
							break;
						default:
							return null;
					}
				}
				weatherCondition();

				// Get temperature
				const temperature = data.main.temp;
				const formatedTemperature = temperature.toString().slice(0, 2);
				temp.innerHTML = formatedTemperature;
				const feels_like = data.main.feels_like;
				const formatedFeelsLike = feels_like.toString().slice(0, 2);
				feels.innerHTML = `Sensação Termica ${formatedFeelsLike}`;

				// Display infos

				// temperature
				const maxTemperature = data.main.temp_max;
				maxTemp.innerHTML = maxTemperature.toString().slice(0, 2);
				const minTemperature = data.main.temp_min;
				minTemp.innerHTML = minTemperature.toString().slice(0, 2);

				// Sunrise e Sunset

				// Sunrise
				const sunrise = data.sys.sunrise;
				const sunriseDate = new Date(sunrise * 1000);
				const sunriseHours = String(sunriseDate.getUTCHours()).padStart(2, "0");
				const sunriseMinutes = String(sunriseDate.getUTCDate()).padStart(2, "0");
				document.querySelector(
					"#nascer-do-sol-data"
				).innerHTML = `${sunriseHours}:${sunriseMinutes}`;

				// Sunset
				const sunset = data.sys.sunset;
				const sunsetDate = new Date(sunset * 1000);
				const sunsetHours = String(sunsetDate.getUTCHours()).padStart(2, "0");
				const sunsetMinutes = String(sunsetDate.getUTCDate()).padStart(2, "0");
				document.querySelector(
					"#por-do-sol-data"
				).innerHTML = `${sunsetHours}:${sunsetMinutes}`;

				// Humidity
				document.querySelector("#humidity").innerHTML = data.main.humidity;
			} catch (error) {
				loading.style.display = "none";
				errorDiv.style.display = "block";
				errorMensage.innerHTML = `Error: ${error}`;
			}
		}
		getWeather();
		// Next 5 days weather
		async function getNextDaysWeather() {
			try {
				const daysResponse = await fetch(nextDaysopenweathermapUrl);
				const daysData = await daysResponse.json();
				console.log(daysData);

				async function getLocalDays() {
					const responseLocal = await fetch(openCageUrl);
					const dataLocal = await responseLocal.json();

					country.innerHTML = dataLocal.results[0].components.country;
					const local1 = document.querySelector("#local1");
					local1.innerHTML =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;

					const local2 = document.querySelector("#local2");
					local2.innerHTML =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;

					const local3 = document.querySelector("#local3");
					local3.innerHTML =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;

					const local4 = document.querySelector("#local4");
					local4.innerHTML =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;

					const local5 = document.querySelector("#local5");
					local5.innerHTML =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;

					const local6 = document.querySelector("#local6");
					local6.innerHTML =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;

					const local7 = document.querySelector("#local7");
					local7.innerHTML =
						dataLocal.results[0].components.city +
						` - ${dataLocal.results[0].components.state_code}`;
				}

				getLocalDays();

				// Card 1
				const card1 = document.querySelector("#card1");

				const icon1 = document.querySelector("#icon1");

				const description1 = document.querySelector("#description1");
				const descriptions1 = daysData.list[0].weather[0].description;
				const formatedDescription1 =
					descriptions1.slice(0, 1).toUpperCase() + descriptions1.substr(1, 1000);
				description1.innerHTML = formatedDescription1;

				const day1 = document.querySelector("#day1");
				const days1 = daysData.list[0].dt_txt;
				const formatedMonth1 = String(days1).slice(5, 7);
				const formatedDay1 = String(days1).slice(8, 10);
				day1.innerHTML = `${formatedDay1} / ${formatedMonth1}`;

				const time1 = document.querySelector("#time1");
				const times1 = daysData.list[0].dt_txt;
				const formatedTime1 = String(times1).slice(10, 16);
				time1.innerHTML = formatedTime1;

				const id1 = Number(daysData.list[0].weather[0].id);

				const temp1 = document.querySelector("#temp1");
				const temps1 = daysData.list[0].main.temp;
				const formatedTemp1 = String(temps1).slice(0, 2);
				temp1.innerHTML = `${formatedTemp1}°C`;

				const tempMaxAndMin1 = document.querySelector("#tempMaxandMin1");
				const tempMin1 = daysData.list[0].main.temp_min;
				const formatedTempMin1 = String(tempMin1).slice(0, 2);
				const tempMax1 = daysData.list[0].main.temp_max;
				const formatedTempMax1 = String(tempMax1).slice(0, 2);
				tempMaxAndMin1.innerHTML = `${formatedTempMax1}° - ${formatedTempMin1}°`;

				console.log(daysData.list[0]);
				switch (daysData.list[0].weather[0].main) {
					// Rain
					case "Rain":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #003760 60%, #00000073)";
						card1.style.backgroundColor = "#003760";
						description1.innerHTML = "Chuva";
						switch (id1) {
							case 501:
								icon1.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 500:
								icon1.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 502:
								icon1.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 503:
								icon1.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 511:
								icon1.setAttribute("src", "/imgs/clima/chuva de gelo.png");
								card1.style.backgroundImage =
									"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
								break;
							case 520:
								icon1.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 521:
								icon1.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 522:
								icon1.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 531:
								icon1.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
						}
						break;
					// Clouds
					case "Clouds":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #2D00FF 60%, #00000073)";
						card1.style.backgroundColor = "#2D00FF";
						weather.innerHTML = "Céu com Nuvens";
						switch (id1) {
							case 801:
								icon1.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
								card1.style.backgroundImage =
									"linear-gradient(160deg, #FE980D 92%, #00000073)";
								card1.style.backgroundColor = "#FE980D";
								break;
							case 802:
								icon1.setAttribute("src", "/imgs/clima/nuven.png");
								break;
							case 803:
								icon1.setAttribute("src", "/imgs/clima/nublado.png");
								break;
							case 804:
								icon1.setAttribute("src", "/imgs/clima/nublado.png");
								break;
						}
						break;
					// Drizzle
					case "Drizzle":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
						card1.style.backgroundColor = "#0F4F7F";
						weather.innerHTML = "Chuvisco";
						icon1.setAttribute("src", "/imgs/clima/chuvisco.png");
						break;
					// Thunderstorm
					case "Thunderstorm":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #686284 60%, #00000073)";
						card1.style.backgroundColor = "#686284";
						weather.innerHTML = "Tempestade";
						icon1.setAttribute("src", "/imgs/clima/tempestade.png");
						break;
					// Snow
					case "Snow":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
						card1.style.backgroundColor = "#6BB4D1";
						weather.innerHTML = "Nevando";
						icon1.setAttribute("src", "/imgs/clima/floco-de-neve.png");
						break;
					// Mist, Smoke, Sand, Ash, Haze, Fog and others
					case "Mist":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Smoke":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Haze":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Dust":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Fog":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Sand":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Ash":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Squall":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Tornado":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card1.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon1.setAttribute("src", "/imgs/clima/vento.png");
						break;
					// Clear Sky
					case "Clear":
						card1.style.backgroundImage =
							"linear-gradient(160deg, #00A1FB 60%, #00000073)";
						card1.style.backgroundColor = "#00A1FB";
						weather.innerHTML = "Céu Limpo";
						icon1.setAttribute("src", "/imgs/clima/sol.png");
						break;
					default:
						return null;
				}

				// Card 2
				const card2 = document.querySelector("#card2");

				const icon2 = document.querySelector("#icon2");

				const description2 = document.querySelector("#description2");
				const descriptions2 = daysData.list[1].weather[0].description;
				const formatedDescription2 =
					descriptions2.slice(0, 1).toUpperCase() + descriptions2.substr(1, 1000);
				description2.innerHTML = formatedDescription2;

				const day2 = document.querySelector("#day2");
				const days2 = daysData.list[1].dt_txt;
				const formatedMonth2 = String(days2).slice(5, 7);
				const formatedDay2 = String(days2).slice(8, 10);
				day2.innerHTML = `${formatedDay2} / ${formatedMonth2}`;

				const time2 = document.querySelector("#time2");
				const times2 = daysData.list[1].dt_txt;
				const formatedTime2 = String(times2).slice(10, 16);
				time2.innerHTML = formatedTime2;

				const id2 = Number(daysData.list[1].weather[0].id);

				const temp2 = document.querySelector("#temp2");
				const temps2 = daysData.list[1].main.temp;
				const formatedTemp2 = String(temps2).slice(0, 2);
				temp2.innerHTML = `${formatedTemp2}°C`;

				const tempMaxAndMin2 = document.querySelector("#tempMaxandMin2");
				const tempMin2 = daysData.list[1].main.temp_min;
				const formatedTempMin2 = String(tempMin2).slice(0, 2);
				const tempMax2 = daysData.list[1].main.temp_max;
				const formatedTempMax2 = String(tempMax2).slice(0, 2);
				tempMaxAndMin2.innerHTML = `${formatedTempMax2}° - ${formatedTempMin2}°`;
				console.log("Card2" + daysData.list[1]);

				switch (daysData.list[1].weather[0].main) {
					// Rain
					case "Rain":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #003760 60%, #00000073)";
						card2.style.backgroundColor = "#003760";
						description2.innerHTML = "Chuva";
						switch (id2) {
							case 501:
								icon2.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 500:
								icon2.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 502:
								icon2.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 503:
								icon2.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 511:
								icon2.setAttribute("src", "/imgs/clima/chuva de gelo.png");
								card2.style.backgroundImage =
									"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
								break;
							case 520:
								icon2.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 521:
								icon2.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 522:
								icon2.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 531:
								icon2.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
						}
						break;
					// Clouds
					case "Clouds":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #2D00FF 60%, #00000073)";
						card2.style.backgroundColor = "#2D00FF";
						weather.innerHTML = "Céu com Nuvens";
						switch (id2) {
							case 801:
								icon2.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
								card2.style.backgroundImage =
									"linear-gradient(160deg, #FE980D 92%, #00000073)";
								card2.style.backgroundColor = "#FE980D";
								break;
							case 802:
								icon2.setAttribute("src", "/imgs/clima/nuven.png");
								break;
							case 803:
								icon2.setAttribute("src", "/imgs/clima/nublado.png");
								break;
							case 804:
								icon2.setAttribute("src", "/imgs/clima/nublado.png");
								break;
						}
						break;
					// Drizzle
					case "Drizzle":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
						card2.style.backgroundColor = "#0F4F7F";
						weather.innerHTML = "Chuvisco";
						icon2.setAttribute("src", "/imgs/clima/chuvisco.png");
						break;
					// Thunderstorm
					case "Thunderstorm":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #686284 60%, #00000073)";
						card2.style.backgroundColor = "#686284";
						weather.innerHTML = "Tempestade";
						icon2.setAttribute("src", "/imgs/clima/tempestade.png");
						break;
					// Snow
					case "Snow":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
						card2.style.backgroundColor = "#6BB4D1";
						weather.innerHTML = "Nevando";
						icon2.setAttribute("src", "/imgs/clima/floco-de-neve.png");
						break;
					// Mist, Smoke, Sand, Ash, Haze, Fog and others
					case "Mist":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Smoke":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Haze":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Dust":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Fog":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Sand":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Ash":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Squall":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Tornado":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card2.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon2.setAttribute("src", "/imgs/clima/vento.png");
						break;
					// Clear Sky
					case "Clear":
						card2.style.backgroundImage =
							"linear-gradient(160deg, #00A1FB 60%, #00000073)";
						card2.style.backgroundColor = "#00A1FB";
						weather.innerHTML = "Céu Limpo";
						icon2.setAttribute("src", "/imgs/clima/sol.png");
						break;
					default:
						return null;
				}

				// Card 3
				const card3 = document.querySelector("#card3");

				const icon3 = document.querySelector("#icon3");

				const description3 = document.querySelector("#description3");
				const descriptions3 = daysData.list[2].weather[0].description;
				const formatedDescription3 =
					descriptions3.slice(0, 1).toUpperCase() + descriptions3.substr(1, 1000);
				description3.innerHTML = formatedDescription3;

				const day3 = document.querySelector("#day3");
				const days3 = daysData.list[2].dt_txt;
				const formatedMonth3 = String(days3).slice(5, 7);
				const formatedDay3 = String(days3).slice(8, 10);
				day3.innerHTML = `${formatedDay3} / ${formatedMonth3}`;

				const time3 = document.querySelector("#time3");
				const times3 = daysData.list[2].dt_txt;
				const formatedTime3 = String(times3).slice(10, 16);
				time3.innerHTML = formatedTime3;

				const id3 = Number(daysData.list[2].weather[0].id);

				const temp3 = document.querySelector("#temp3");
				const temps3 = daysData.list[2].main.temp;
				const formatedTemp3 = String(temps3).slice(0, 2);
				temp3.innerHTML = `${formatedTemp3}°C`;

				const tempMaxAndMin3 = document.querySelector("#tempMaxandMin3");
				const tempMin3 = daysData.list[2].main.temp_min;
				const formatedTempMin3 = String(tempMin3).slice(0, 2);
				const tempMax3 = daysData.list[2].main.temp_max;
				const formatedTempMax3 = String(tempMax3).slice(0, 2);
				tempMaxAndMin3.innerHTML = `${formatedTempMax3}° - ${formatedTempMin3}°`;

				switch (daysData.list[2].weather[0].main) {
					// Rain
					case "Rain":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #003760 60%, #00000073)";
						card3.style.backgroundColor = "#003760";
						description2.innerHTML = "Chuva";
						switch (id3) {
							case 501:
								icon3.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 500:
								icon3.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 502:
								icon3.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 503:
								icon3.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 511:
								icon3.setAttribute("src", "/imgs/clima/chuva de gelo.png");
								card3.style.backgroundImage =
									"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
								break;
							case 520:
								icon3.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 521:
								icon3.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 522:
								icon3.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 531:
								icon3.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
						}
						break;
					// Clouds
					case "Clouds":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #2D00FF 60%, #00000073)";
						card3.style.backgroundColor = "#2D00FF";
						weather.innerHTML = "Céu com Nuvens";
						switch (id3) {
							case 801:
								icon3.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
								card3.style.backgroundImage =
									"linear-gradient(160deg, #FE980D 92%, #00000073)";
								card3.style.backgroundColor = "#FE980D";
								break;
							case 802:
								icon3.setAttribute("src", "/imgs/clima/nuven.png");
								break;
							case 803:
								icon3.setAttribute("src", "/imgs/clima/nublado.png");
								break;
							case 804:
								icon3.setAttribute("src", "/imgs/clima/nublado.png");
								break;
						}
						break;
					// Drizzle
					case "Drizzle":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
						card3.style.backgroundColor = "#0F4F7F";
						weather.innerHTML = "Chuvisco";
						icon3.setAttribute("src", "/imgs/clima/chuvisco.png");
						break;
					// Thunderstorm
					case "Thunderstorm":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #686284 60%, #00000073)";
						card3.style.backgroundColor = "#686284";
						weather.innerHTML = "Tempestade";
						icon3.setAttribute("src", "/imgs/clima/tempestade.png");
						break;
					// Snow
					case "Snow":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
						card3.style.backgroundColor = "#6BB4D1";
						weather.innerHTML = "Nevando";
						icon3.setAttribute("src", "/imgs/clima/floco-de-neve.png");
						break;
					// Mist, Smoke, Sand, Ash, Haze, Fog and others
					case "Mist":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Smoke":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Haze":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Dust":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Fog":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Sand":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Ash":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Squall":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Tornado":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card3.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon3.setAttribute("src", "/imgs/clima/vento.png");
						break;
					// Clear Sky
					case "Clear":
						card3.style.backgroundImage =
							"linear-gradient(160deg, #00A1FB 60%, #00000073)";
						card3.style.backgroundColor = "#00A1FB";
						weather.innerHTML = "Céu Limpo";
						icon3.setAttribute("src", "/imgs/clima/sol.png");
						break;
					default:
						return null;
				}

				// Card 4
				const card4 = document.querySelector("#card4");

				const icon4 = document.querySelector("#icon4");

				const description4 = document.querySelector("#description4");
				const descriptions4 = daysData.list[3].weather[0].description;
				const formatedDescription4 =
					descriptions4.slice(0, 1).toUpperCase() + descriptions4.substr(1, 1000);
				description4.innerHTML = formatedDescription4;

				const day4 = document.querySelector("#day4");
				const days4 = daysData.list[3].dt_txt;
				const formatedMonth4 = String(days4).slice(5, 7);
				const formatedDay4 = String(days4).slice(8, 10);
				day4.innerHTML = `${formatedDay4} / ${formatedMonth4}`;

				const time4 = document.querySelector("#time4");
				const times4 = daysData.list[3].dt_txt;
				const formatedTime4 = String(times4).slice(10, 16);
				time4.innerHTML = formatedTime4;

				const id4 = Number(daysData.list[3].weather[0].id);

				const temp4 = document.querySelector("#temp4");
				const temps4 = daysData.list[3].main.temp;
				const formatedTemp4 = String(temps4).slice(0, 2);
				temp4.innerHTML = `${formatedTemp4}°C`;

				const tempMaxAndMin4 = document.querySelector("#tempMaxandMin4");
				const tempMin4 = daysData.list[3].main.temp_min;
				const formatedTempMin4 = String(tempMin4).slice(0, 2);
				const tempMax4 = daysData.list[3].main.temp_max;
				const formatedTempMax4 = String(tempMax4).slice(0, 2);
				tempMaxAndMin4.innerHTML = `${formatedTempMax4}° - ${formatedTempMin4}°`;

				switch (daysData.list[3].weather[0].main) {
					// Rain
					case "Rain":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #003760 60%, #00000073)";
						card4.style.backgroundColor = "#003760";
						description2.innerHTML = "Chuva";
						switch (id4) {
							case 501:
								icon4.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 500:
								icon4.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 502:
								icon4.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 503:
								icon4.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 511:
								icon4.setAttribute("src", "/imgs/clima/chuva de gelo.png");
								card4.style.backgroundImage =
									"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
								break;
							case 520:
								icon4.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 521:
								icon4.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 522:
								icon4.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 531:
								icon4.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
						}
						break;
					// Clouds
					case "Clouds":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #2D00FF 60%, #00000073)";
						card4.style.backgroundColor = "#2D00FF";
						weather.innerHTML = "Céu com Nuvens";
						switch (id4) {
							case 801:
								icon4.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
								card4.style.backgroundImage =
									"linear-gradient(160deg, #FE980D 92%, #00000073)";
								card4.style.backgroundColor = "#FE980D";
								break;
							case 802:
								icon4.setAttribute("src", "/imgs/clima/nuven.png");
								break;
							case 803:
								icon4.setAttribute("src", "/imgs/clima/nublado.png");
								break;
							case 804:
								icon4.setAttribute("src", "/imgs/clima/nublado.png");
								break;
						}
						break;
					// Drizzle
					case "Drizzle":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
						card4.style.backgroundColor = "#0F4F7F";
						weather.innerHTML = "Chuvisco";
						icon4.setAttribute("src", "/imgs/clima/chuvisco.png");
						break;
					// Thunderstorm
					case "Thunderstorm":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #686284 60%, #00000073)";
						card4.style.backgroundColor = "#686284";
						weather.innerHTML = "Tempestade";
						icon4.setAttribute("src", "/imgs/clima/tempestade.png");
						break;
					// Snow
					case "Snow":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
						card4.style.backgroundColor = "#6BB4D1";
						weather.innerHTML = "Nevando";
						icon4.setAttribute("src", "/imgs/clima/floco-de-neve.png");
						break;
					// Mist, Smoke, Sand, Ash, Haze, Fog and others
					case "Mist":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Smoke":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Haze":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Dust":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Fog":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Sand":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Ash":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Squall":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Tornado":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card4.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon4.setAttribute("src", "/imgs/clima/vento.png");
						break;
					// Clear Sky
					case "Clear":
						card4.style.backgroundImage =
							"linear-gradient(160deg, #00A1FB 60%, #00000073)";
						card4.style.backgroundColor = "#00A1FB";
						weather.innerHTML = "Céu Limpo";
						icon4.setAttribute("src", "/imgs/clima/sol.png");
						break;
					default:
						return null;
				}

				// Card 5
				const card5 = document.querySelector("#card5");

				const icon5 = document.querySelector("#icon5");

				const description5 = document.querySelector("#description5");
				const descriptions5 = daysData.list[4].weather[0].description;
				const formatedDescription5 =
					descriptions5.slice(0, 1).toUpperCase() + descriptions5.substr(1, 1000);
				description5.innerHTML = formatedDescription5;

				const day5 = document.querySelector("#day5");
				const days5 = daysData.list[4].dt_txt;
				const formatedMonth5 = String(days5).slice(5, 7);
				const formatedDay5 = String(days5).slice(8, 10);
				day5.innerHTML = `${formatedDay5} / ${formatedMonth5}`;

				const time5 = document.querySelector("#time5");
				const times5 = daysData.list[4].dt_txt;
				const formatedTime5 = String(times5).slice(10, 16);
				time5.innerHTML = formatedTime5;

				const id5 = Number(daysData.list[4].weather[0].id);

				const temp5 = document.querySelector("#temp5");
				const temps5 = daysData.list[4].main.temp;
				const formatedTemp5 = String(temps5).slice(0, 2);
				temp5.innerHTML = `${formatedTemp5}°C`;

				const tempMaxAndMin5 = document.querySelector("#tempMaxandMin5");
				const tempMin5 = daysData.list[4].main.temp_min;
				const formatedTempMin5 = String(tempMin5).slice(0, 2);
				const tempMax5 = daysData.list[4].main.temp_max;
				const formatedTempMax5 = String(tempMax5).slice(0, 2);
				tempMaxAndMin5.innerHTML = `${formatedTempMax5}° - ${formatedTempMin5}°`;
				console.log(id5);

				switch (daysData.list[4].weather[0].main) {
					// Rain
					case "Rain":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #003760 60%, #00000073)";
						card5.style.backgroundColor = "#003760";
						description2.innerHTML = "Chuva";
						switch (id5) {
							case 501:
								icon5.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 500:
								icon5.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 502:
								icon5.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 503:
								icon5.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 511:
								icon5.setAttribute("src", "/imgs/clima/chuva de gelo.png");
								card5.style.backgroundImage =
									"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
								break;
							case 520:
								icon5.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 521:
								icon5.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 522:
								icon5.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 531:
								icon5.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
						}
						break;
					// Clouds
					case "Clouds":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #2D00FF 60%, #00000073)";
						card5.style.backgroundColor = "#2D00FF";
						weather.innerHTML = "Céu com Nuvens";
						switch (id5) {
							case 801:
								icon5.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
								card5.style.backgroundImage =
									"linear-gradient(160deg, #FE980D 92%, #00000073)";
								card5.style.backgroundColor = "#FE980D";
							case 802:
								icon5.setAttribute("src", "/imgs/clima/nuven.png");
								break;
							case 803:
								icon5.setAttribute("src", "/imgs/clima/nublado.png");
								break;
							case 804:
								icon5.setAttribute("src", "/imgs/clima/nublado.png");
								break;
						}
						break;
					// Drizzle
					case "Drizzle":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
						card5.style.backgroundColor = "#0F4F7F";
						weather.innerHTML = "Chuvisco";
						icon5.setAttribute("src", "/imgs/clima/chuvisco.png");
						break;
					// Thunderstorm
					case "Thunderstorm":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #686284 60%, #00000073)";
						card5.style.backgroundColor = "#686284";
						weather.innerHTML = "Tempestade";
						icon5.setAttribute("src", "/imgs/clima/tempestade.png");
						break;
					// Snow
					case "Snow":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
						card5.style.backgroundColor = "#6BB4D1";
						weather.innerHTML = "Nevando";
						icon5.setAttribute("src", "/imgs/clima/floco-de-neve.png");
						break;
					// Mist, Smoke, Sand, Ash, Haze, Fog and others
					case "Mist":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Smoke":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Haze":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Dust":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Fog":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Sand":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Ash":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Squall":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Tornado":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card5.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon5.setAttribute("src", "/imgs/clima/vento.png");
						break;
					// Clear Sky
					case "Clear":
						card5.style.backgroundImage =
							"linear-gradient(160deg, #00A1FB 60%, #00000073)";
						card5.style.backgroundColor = "#00A1FB";
						weather.innerHTML = "Céu Limpo";
						icon5.setAttribute("src", "/imgs/clima/sol.png");
						break;
					default:
						return null;
				}

				// Card 6
				const card6 = document.querySelector("#card6");

				const icon6 = document.querySelector("#icon6");

				const description6 = document.querySelector("#description6");
				const descriptions6 = daysData.list[5].weather[0].description;
				const formatedDescription6 =
					descriptions6.slice(0, 1).toUpperCase() + descriptions6.substr(1, 1000);
				description6.innerHTML = formatedDescription6;

				const day6 = document.querySelector("#day6");
				const days6 = daysData.list[5].dt_txt;
				const formatedMonth6 = String(days6).slice(5, 7);
				const formatedDay6 = String(days6).slice(8, 10);
				day6.innerHTML = `${formatedDay6} / ${formatedMonth6}`;

				const time6 = document.querySelector("#time6");
				const times6 = daysData.list[5].dt_txt;
				const formatedTime6 = String(times6).slice(10, 16);
				time6.innerHTML = formatedTime6;

				const id6 = Number(daysData.list[5].weather[0].id);

				const temp6 = document.querySelector("#temp6");
				const temps6 = daysData.list[5].main.temp;
				const formatedTemp6 = String(temps6).slice(0, 2);
				temp6.innerHTML = `${formatedTemp6}°C`;

				const tempMaxAndMin6 = document.querySelector("#tempMaxandMin6");
				const tempMin6 = daysData.list[5].main.temp_min;
				const formatedTempMin6 = String(tempMin6).slice(0, 2);
				const tempMax6 = daysData.list[5].main.temp_max;
				const formatedTempMax6 = String(tempMax6).slice(0, 2);
				tempMaxAndMin6.innerHTML = `${formatedTempMax6}° - ${formatedTempMin6}°`;

				switch (daysData.list[5].weather[0].main) {
					// Rain
					case "Rain":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #003760 60%, #00000073)";
						card6.style.backgroundColor = "#003760";
						description2.innerHTML = "Chuva";
						switch (id6) {
							case 501:
								icon6.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 500:
								icon6.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 502:
								icon6.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 503:
								icon6.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 511:
								icon6.setAttribute("src", "/imgs/clima/chuva de gelo.png");
								card6.style.backgroundImage =
									"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
								break;
							case 520:
								icon6.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 521:
								icon6.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 522:
								icon6.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 531:
								icon6.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
						}
						break;
					// Clouds
					case "Clouds":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #2D00FF 60%, #00000073)";
						card6.style.backgroundColor = "#2D00FF";
						weather.innerHTML = "Céu com Nuvens";
						switch (id6) {
							case 801:
								icon6.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
								card6.style.backgroundImage =
									"linear-gradient(160deg, #FE980D 92%, #00000073)";
								card6.style.backgroundColor = "#FE980D";
								break;
							case 802:
								icon6.setAttribute("src", "/imgs/clima/nuven.png");
								break;
							case 803:
								icon6.setAttribute("src", "/imgs/clima/nublado.png");
								break;
							case 804:
								icon6.setAttribute("src", "/imgs/clima/nublado.png");
								break;
						}
						break;
					// Drizzle
					case "Drizzle":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
						card6.style.backgroundColor = "#0F4F7F";
						weather.innerHTML = "Chuvisco";
						icon6.setAttribute("src", "/imgs/clima/chuvisco.png");
						break;
					// Thunderstorm
					case "Thunderstorm":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #686284 60%, #00000073)";
						card6.style.backgroundColor = "#686284";
						weather.innerHTML = "Tempestade";
						icon6.setAttribute("src", "/imgs/clima/tempestade.png");
						break;
					// Snow
					case "Snow":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
						card6.style.backgroundColor = "#6BB4D1";
						weather.innerHTML = "Nevando";
						icon6.setAttribute("src", "/imgs/clima/floco-de-neve.png");
						break;
					// Mist, Smoke, Sand, Ash, Haze, Fog and others
					case "Mist":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Smoke":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Haze":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Dust":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Fog":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Sand":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Ash":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Squall":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Tornado":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card6.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon6.setAttribute("src", "/imgs/clima/vento.png");
						break;
					// Clear Sky
					case "Clear":
						card6.style.backgroundImage =
							"linear-gradient(160deg, #00A1FB 60%, #00000073)";
						card6.style.backgroundColor = "#00A1FB";
						weather.innerHTML = "Céu Limpo";
						icon6.setAttribute("src", "/imgs/clima/sol.png");
						break;
					default:
						return null;
				}

				// Card 7
				const card7 = document.querySelector("#card7");

				const icon7 = document.querySelector("#icon7");

				const description7 = document.querySelector("#description7");
				const descriptions7 = daysData.list[6].weather[0].description;
				const formatedDescription7 =
					descriptions7.slice(0, 1).toUpperCase() + descriptions7.substr(1, 1000);
				description7.innerHTML = formatedDescription7;

				const day7 = document.querySelector("#day7");
				const days7 = daysData.list[6].dt_txt;
				const formatedMonth7 = String(days7).slice(5, 7);
				const formatedDay7 = String(days7).slice(8, 10);
				day7.innerHTML = `${formatedDay7} / ${formatedMonth7}`;

				const time7 = document.querySelector("#time7");
				const times7 = daysData.list[6].dt_txt;
				const formatedTime7 = String(times7).slice(10, 16);
				time7.innerHTML = formatedTime7;

				const id7 = Number(daysData.list[6].weather[0].id);

				const temp7 = document.querySelector("#temp7");
				const temps7 = daysData.list[5].main.temp;
				const formatedTemp7 = String(temps7).slice(0, 2);
				temp7.innerHTML = `${formatedTemp7}°C`;

				const tempMaxAndMin7 = document.querySelector("#tempMaxandMin7");
				const tempMin7 = daysData.list[6].main.temp_min;
				const formatedTempMin7 = String(tempMin7).slice(0, 2);
				const tempMax7 = daysData.list[6].main.temp_max;
				const formatedTempMax7 = String(tempMax6).slice(0, 2);
				tempMaxAndMin7.innerHTML = `${formatedTempMax7}° - ${formatedTempMin7}°`;

				switch (daysData.list[6].weather[0].main) {
					// Rain
					case "Rain":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #003760 60%, #00000073)";
						card7.style.backgroundColor = "#003760";
						description2.innerHTML = "Chuva";
						switch (id7) {
							case 501:
								icon7.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 500:
								icon7.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 502:
								icon7.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 503:
								icon7.setAttribute("src", "/imgs/clima/chuva.png");
								break;
							case 511:
								icon7.setAttribute("src", "/imgs/clima/chuva de gelo.png");
								card7.style.backgroundImage =
									"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
								break;
							case 520:
								icon7.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 521:
								icon7.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 522:
								icon7.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
							case 531:
								icon7.setAttribute("src", "/imgs/clima/chuva fraca.png");
								break;
						}
						break;
					// Clouds
					case "Clouds":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #2D00FF 60%, #00000073)";
						card7.style.backgroundColor = "#2D00FF";
						weather.innerHTML = "Céu com Nuvens";
						switch (id7) {
							case 801:
								icon7.setAttribute("src", "/imgs/clima/poucas_nuvens.png");
								card7.style.backgroundImage =
									"linear-gradient(160deg, #FE980D 92%, #00000073)";
								card7.style.backgroundColor = "#FE980D";
								break;
							case 802:
								icon7.setAttribute("src", "/imgs/clima/nuven.png");
								break;
							case 803:
								icon7.setAttribute("src", "/imgs/clima/nublado.png");
								break;
							case 804:
								icon7.setAttribute("src", "/imgs/clima/nublado.png");
								break;
						}
						break;
					// Drizzle
					case "Drizzle":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0F4F7F 60%, #00000073)";
						card7.style.backgroundColor = "#0F4F7F";
						weather.innerHTML = "Chuvisco";
						icon7.setAttribute("src", "/imgs/clima/chuvisco.png");
						break;
					// Thunderstorm
					case "Thunderstorm":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #686284 60%, #00000073)";
						card7.style.backgroundColor = "#686284";
						weather.innerHTML = "Tempestade";
						icon7.setAttribute("src", "/imgs/clima/tempestade.png");
						break;
					// Snow
					case "Snow":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #6BB4D1 60%, #00000073)";
						card7.style.backgroundColor = "#6BB4D1";
						weather.innerHTML = "Nevando";
						icon7.setAttribute("src", "/imgs/clima/floco-de-neve.png");
						break;
					// Mist, Smoke, Sand, Ash, Haze, Fog and others
					case "Mist":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Smoke":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Haze":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Dust":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Fog":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Sand":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Ash":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Squall":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					case "Tornado":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #0AA591 60%, #00000073)";
						card7.style.backgroundColor = "#0AA591";
						weather.innerHTML = "Ventando";
						icon7.setAttribute("src", "/imgs/clima/vento.png");
						break;
					// Clear Sky
					case "Clear":
						card7.style.backgroundImage =
							"linear-gradient(160deg, #00A1FB 60%, #00000073)";
						card7.style.backgroundColor = "#00A1FB";
						weather.innerHTML = "Céu Limpo";
						icon7.setAttribute("src", "/imgs/clima/sol.png");
						break;
					default:
						return null;
				}
				description2.innerHTML = formatedDescription2;
				loading.style.display = "none";
			} catch (error) {
				loading.style.display = "none";
				errorDiv.style.display = "block";
				errorMensage.innerHTML = `Error: ${error}`;
			}
		}
		getNextDaysWeather();

		function getData() {
			const date = new Date();
			// filter Months
			const months = [
				"Janeiro",
				"Fevereiro",
				"Março",
				"Abril",
				"Maio",
				"Junho",
				"Julho",
				"Agosto",
				"Setembro",
				"Outubro",
				"Novembro",
				"Dezembro",
			];
			const day = String(date.getDate()).padStart(2, "0");
			const hours = String(date.getHours()).padStart(2, "0");
			const minutes = String(date.getMinutes()).padStart(2, "0");
			// create Data and Hour
			data.innerText = `Hoje ${day} De ${
				months[date.getMonth()]
			} De ${date.getFullYear()} As ${hours}:${minutes}`;
		}
		getData();

		var swiper = new Swiper(".mySwiper", {
			slidesPerView: 3.8,
			spaceBetween: 30,
			pagination: {
				el: ".swiper-pagination",
			},
		});

		if (screen.width <= 750) {
			var swiper = new Swiper(".mySwiper", {
				slidesPerView: 3.8,
				spaceBetween: 25,
				pagination: {
					el: ".swiper-pagination",
				},
			});
			console.log("Você está em um mobile");
		} else {
			console.log("você está no PC");
		}

		getNextDaysWeather();
	},
	showError,
	geoConfigs
);
