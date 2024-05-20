const membershipEndpoint = 'http://127.0.0.1:3000/membership';

async function getMemberships() {

    try {
        const response = await fetch(membershipEndpoint);  
        if (!response.ok) {
            console.log("Failed to fetch memberships");
        }   
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching memberships");
    }
}

function createPackageCard(membership) {
    const packageCard = document.createElement('section');
    packageCard.classList.add('packageCard');

    const h2 = document.createElement('h2');
    h2.textContent = `$${membership.price} ${membership.name}`;
    packageCard.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = membership.description;
    packageCard.appendChild(p);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    packageCard.appendChild(deleteButton);

    return packageCard;
}

function displayMemberships(memberships) {
    const main = document.querySelector('main');

    memberships.forEach(membership => {
            const packageCard = createPackageCard(membership);
            main.appendChild(packageCard);
        });
}

async function init() {
    try {
        const memberships = await getMemberships();
        displayMemberships(memberships);
    } catch (error) {
        console.log("Error getting memberships");
    }
}

init();