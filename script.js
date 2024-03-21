// Function to display skill costs and group them by linkedLoadouts displayName
function displaySkillCosts(jsonData) {
    const skillCostsDiv = document.getElementById('skill-costs');
    const loadoutMap = new Map();

    // Group skills by linkedLoadouts displayName
    jsonData.data.forEach(skill => {
        skill.linkedLoadouts.forEach(loadout => {
            const displayName = loadout.displayName;
            if (!loadoutMap.has(displayName)) {
                loadoutMap.set(displayName, []);
            }
            loadoutMap.get(displayName).push(skill);
        });
    });

    // Display skill costs grouped by linkedLoadouts displayName
    loadoutMap.forEach((skills, displayName) => {
        const loadoutDiv = document.createElement('div');
        loadoutDiv.classList.add('loadout');
        loadoutDiv.innerHTML = `<h2>${displayName}</h2>`;

        let totalCost = 0;
        skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill');
            skillDiv.textContent = `${skill.name}: ${skill.price}`;
            loadoutDiv.appendChild(skillDiv);
            totalCost += skill.price;
        });

        const totalCostDiv = document.createElement('div');
        totalCostDiv.textContent = `Total Cost: ${totalCost.toFixed(2)}`;
        loadoutDiv.appendChild(totalCostDiv);

        skillCostsDiv.appendChild(loadoutDiv);
    });
}

function fetchJsonData() {
    const apiUrl = 'https://nameless-bastion-54521-7253a77a44ff.herokuapp.com/skill';

    $.getJSON(apiUrl, function(data) {
        console.log('Received data:', data); // Log the received data
        if (data && data.data) {
            displaySkillCosts(data);
        } else {
            console.error('Invalid data format:', data);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load skill costs. Invalid data format.';
            document.getElementById('skill-costs').innerHTML = ''; // Clear previous content
            document.getElementById('skill-costs').appendChild(errorMessage);
        }
    }).fail(function(jqxhr, textStatus, error) {
        console.error('Error fetching JSON data:', textStatus, error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to load skill costs. Please try again later.';
        document.getElementById('skill-costs').innerHTML = ''; // Clear previous content
        document.getElementById('skill-costs').appendChild(errorMessage);
    });
}

// Call the function to fetch JSON data when the page loads
window.onload = fetchJsonData;