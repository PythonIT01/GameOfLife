class GameSimulation {

  // INITIALIZATION
  constructor(size) {
    this.size = size;
    this.entities = this.initEntities(this.size);
  }


  // FUNCTIONS

  // Update: Simulate a round
  update() {
    const updateRelatives = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    const updateStates = [];

    for (var row = 0; row < this.size; row++) {
      const rowStates = [];

      for (var col = 0; col < this.size; col++) {
        const neighborStates = [];

        for (const neighbor of updateRelatives) {
          const neighborRow = row + neighbor[0];
          const neighborCol = col + neighbor[1];
          if (neighborRow < 0 || neighborRow >= this.size || neighborCol < 0 || neighborCol >= this.size) {
            neighborStates.push(0);
          } else {
            neighborStates.push(this.entities[neighborRow][neighborCol]);
          }
        }

        let neighborSum = 0;
        for (var i = 0; i < neighborStates.length; i++) {
          neighborSum += neighborStates[i];
        }

        if (this.entities[row][col] && (neighborSum < 2 || neighborSum > 3)) {
          rowStates.push(0);
        } else if (neighborSum == 3) {
          rowStates.push(1);
        } else {
          rowStates.push(this.entities[row][col]);
        }

      }

      updateStates.push(rowStates);

    }

    this.setEntities(updateStates);

  }


  // Set Entities
  setEntitiesSafe(entityArray) {
    for (var row = 0; row < this.size; row++) {
      for (var col = 0; col < this.size; col++) {
        this.entities[row][col] = entityArray[row][col];
      }
    }
  }

  setEntities(entityArray) {
    this.entities = entityArray;
  }


  // Get Entities
  getEntities() {
    return this.entities;
  }


  // Bear a new Enitity
  bearEntity(row, col) {
    this.entities[row][col] = 1;
  }

  // Kill an Entity
  killEntity(row, col) {
    this.entities[row][col] = 0;
  }


  // Initialize Entities
  initEntities() {
    const entitiesArray = [];
    for (var i = 0; i < this.size; i++) {
      const rowArray = [];
      for (var j = 0; j < this.size; j++) {
        rowArray.push(0);
      }
      entitiesArray.push(rowArray);
    }
    return entitiesArray;
  }

}
