document.addEventListener('DOMContentLoaded', function () {
      
      function handleDishClick(event) {
        const clickedImage = event.target;
        toggleImageSize(clickedImage);
        updateMealPlan(clickedImage);
    }

    
    const imgArray = document.querySelectorAll('.gallery-image');
    imgArray.forEach(image => {
        image.addEventListener('click', handleDishClick);
    });

    
    function toggleImageSize(clickedImage) {
        
        const lastClickedImage = document.querySelector('.big');
        if (lastClickedImage && lastClickedImage !== clickedImage) {
            lastClickedImage.classList.remove('big');
        }

       
        clickedImage.classList.toggle('big');
    }

    
    function updateMealPlan(clickedImage) {
        const dishNumber = clickedImage.dataset.dishNumber;
        const dishDescription = document.getElementById(`dish-description-${dishNumber}`);
        const dishPrice = parseFloat(dishDescription.querySelector('p:last-child').textContent.replace('Price: $', ''));

       
        addToMealPlan(dishDescription, dishPrice);
    }

  
    function addToMealPlan(dishDescription, dishPrice) {
        const mealPlanList = document.getElementById('meal-plan-list');

        
        const listItem = document.createElement('li');
        listItem.innerHTML = `${dishDescription.querySelector('h2').textContent} - $${dishPrice.toFixed(2)}`;

        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () {
            removeFromMealPlan(listItem, dishPrice);
        });

        const addAnotherButton = document.createElement('button');
        addAnotherButton.textContent = 'Add Another Order';
        addAnotherButton.addEventListener('click', function () {
            addToMealPlan(dishDescription, dishPrice);
        });

        listItem.appendChild(removeButton);
        listItem.appendChild(addAnotherButton);

        
        mealPlanList.appendChild(listItem);

        
        updateTotalCost(dishPrice);
    }

    
    function removeFromMealPlan(listItem, dishPrice) {
        const mealPlanList = document.getElementById('meal-plan-list');

        
        mealPlanList.removeChild(listItem);

        
        updateTotalCost(-dishPrice);
    }

    
    function updateTotalCost(amount) {
        const totalCostElement = document.getElementById('total-cost');
        const currentTotal = parseFloat(totalCostElement.textContent);
        const newTotal = currentTotal + amount;

        
        totalCostElement.textContent = newTotal.toFixed(2);
    }
});