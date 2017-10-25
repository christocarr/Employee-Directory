document.addEventListener('DOMContentLoaded', loadWorkers);
			
			let myWorker = '';
			let myJSON = '';
			let myWorkerCard = '';
			let myWorkerLength = 0;

			function loadWorkers() {
				var xhr = new XMLHttpRequest();
				
				xhr.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						myJSON = this.responseText;
						myWorker = JSON.parse(myJSON);
			
					for (i = 0; i < Object.keys(myWorker.results).length; i++) {
						
						 myWorkerCard += `
							<div class="container" id="container${[i]}">
								<img class="employee-image" src="${myWorker.results[i].picture.large}" alt="Employee Image">
								<div class="employee-details">
									<p class="first-name">${myWorker.results[i].name.first}</p>
									<p class="last-name">${myWorker.results[i].name.last}</p>
									<p class="worker-email">${myWorker.results[i].email}</p>
									<p class="worker-city">${myWorker.results[i].location.city}</p>
								</div>
							</div>
							`
						}
					
						document.getElementById('wrapper').innerHTML = myWorkerCard;
						console.log(myWorkerCard);
						
				//Modal Functionality
						let workerCardID = '';
						
						for (i = 0; i < 12; i++) {
							let workerCardID = `workerCardID${[i]}`;
							workerCardID = document.getElementById('container' + [i]);
							workerCardID.addEventListener('click', function(e) {
								console.log(e.this);
						})
							
						}
						
						
					}
					
					
					
				};
				
				xhr.open('GET', 'https://randomuser.me/api/?results=12&inc=name,email,location, picture,username,cell,dob,login', true);
				xhr.send();
				
				
			}

