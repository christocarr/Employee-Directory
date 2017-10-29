document.addEventListener('DOMContentLoaded', loadWorkers);
			
			let myWorker = '';
			let myJSON = '';
			let myWorkerCard = '';
			let myWorkerLength = 0;
			let workerCardID = '';
			let selectedWorkers;
			let workerModal = '';

			function loadWorkers() {
				let xhr = new XMLHttpRequest();
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
						
			//Modal Functionality
					
					//select all employee cards
					 selectedWorkers = document.getElementsByClassName('container');
				
					//add click event listner to each employee card
						for(i = 0; i < selectedWorkers.length; i++) {
						 selectedWorkers[i].addEventListener('click', openModal(i));
					 	}
						
						function openModal(i) {
							return function () {
								document.getElementById('modal').style.display ='block';
								
								workerModal = `
								<div class="modal-content" id="container${[i]}">
									<span class="close-modal" id="closeModal">&times;</span>
									<img class="employee-image" src="${myWorker.results[i].picture.large}" alt="Employee Image">
								<div class="employee-details">
									<p class="first-name">${myWorker.results[i].name.first}</p>
									<p class="last-name">${myWorker.results[i].name.last}</p>
									<p class="worker-email">${myWorker.results[i].email}</p>
									<p class="worker-city">${myWorker.results[i].location.city}</p>
								</div>

								<div class="employee-contact">
									<p class="phone-number">${myWorker.results[i].cell}</p>
									<p class="address">${myWorker.results[i].location.street},</p>
									<p class="address">${myWorker.results[i].location.state}</p>
									<p class="birthdate">Birthday: ${myWorker.results[i].dob}</p>
									<span class="next" id="next">&#8250;</span>
									<span class="previous" id="previous">&#8249;</span>
								</div>
								`
								document.getElementById('modalWrapper').innerHTML = workerModal;
								
								document.getElementById('closeModal').addEventListener('click', (closeModal));
								
					//next and previous button functionality			
								const next = document.getElementById('next');
								
								const previous = document.getElementById('previous');
								
								next.addEventListener('click', nextWorker);
								
								function nextWorker() {
									openModal(i++);
								}
								
							};
						}
						
					//close modal functionality		
								
								const modal = document.getElementById('modal'); 
								
								window.onclick = function(e) {
									if (e.target == modal) {
										modal.style.display = 'none';
									}
								}					
								function closeModal() {
									document.getElementById('modal').style.display ='none';
								}
				
				}
					
					
					
				};
				
				xhr.open('GET', 'https://randomuser.me/api/?results=12&inc=name,email,location, picture,username,cell,dob,login', true);
				xhr.send();
				
				
			}

