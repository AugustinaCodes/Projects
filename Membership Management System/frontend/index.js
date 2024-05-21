const membershipEndpoint = 'http://127.0.0.1:3000/membership';

async function getMemberships() {

    try {
        const response = await fetch(membershipEndpoint);  
        if (!response.ok) {
            console.log("Failed to fetch memberships");
        }   
        return await response.json();
    } catch (error) {
        console.log("Error fetching memberships");
    }
}

async function deleteMembership(membershipId) {
    try {
        const response = await fetch(`${membershipEndpoint}/${membershipId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            console.log("Failed to delete membership");
        }
    } catch (error) {
        console.log("Error deleting memberhsip");
    }
}

async function createMembership(data) {
    try {
        const response = await fetch(membershipEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.log("Failed to create membership");
        }
        return await response.json();
    } catch (error) {
        console.log("Error creating membership");
    }
}

// Function for creating each section card for each membership to display

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
    deleteButton.addEventListener('click', async () => {
        await deleteMembership(membership._id);
        packageCard.remove();
    })
    packageCard.appendChild(deleteButton);

    document.querySelector('main').appendChild(packageCard);
}

function displayMemberships(memberships) {
    memberships.forEach(membership => {
        createPackageCard(membership);
    });
}

// Initialising function, when the page is loaded, all of the memberships are displayed and seen

async function init() {
    try {
        const memberships = await getMemberships();
        displayMemberships(memberships);
    } catch (error) {
        console.log("Error getting memberships");
    }
}

// Query selectors for New Membership button, so once clicked, it takes me to the Create Membership form 

document.querySelector('.newMembershipButton').addEventListener('click', (e) => {
    e.preventDefault();

    console.log("New Membership button clicked");

    document.querySelector('.upperHeader').classList.add('hidden');
    document.querySelectorAll('.packageCard').forEach(card => card.classList.add('hidden'));
    document.querySelector('.createMembership').classList.remove('hidden');
});

document.querySelector('.cancelButton').addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('.upperHeader').classList.remove('hidden');
    document.querySelectorAll('.packageCard').forEach(card => card.classList.remove('hidden'));
    document.querySelector('.createMembership').classList.add('hidden');
});

document.querySelector('#createMembershipForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const description = document.querySelector('#description').value;

    const newMembership = {
        name,
        price,
        description
    };

    try {
        const createdMembership = await createMembership(newMembership);
        createPackageCard(createdMembership);

        document.querySelector('.upperHeader').classList.remove('hidden');
        document.querySelectorAll('.packageCard').forEach(card => card.classList.remove('hidden'));
        document.querySelector('.createMembership').classList.add('hidden');
    } catch (error) {
        console.error("Error creating membership:");
    }
});

init();