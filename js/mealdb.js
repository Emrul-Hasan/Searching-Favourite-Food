document.getElementById('error-message').style.display = 'none';


const searchFood = () => {
    const searchField = document.getElementById('search-field');

    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        console.log("jhhjgj");
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        // console.log(url);
        fetch(url)
            .then(Response => Response.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));

    }

}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';

}
const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');

    //    clear all
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    if (meals.length == 0) {
        // console.log('Emon');
    }

    meals.forEach(meal => {
        console.log(meal)
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    </div>
        `
        searchResult.appendChild(div);
    });
}

const loadMealDetails = mealId => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => displayMealDetails(data.meals[0]))
}
const displayMealDetails = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
    
    `;
    mealDetails.appendChild(div);
}
