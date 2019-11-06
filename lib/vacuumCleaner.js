class VacuumCleaner {
  constructor() {
    this.area
    this.position
    this.commands = ['L', 'R', 'M']
    this.directions = ['E', 'W', 'N', 'S']
  }

  setArea(area) {
    if (
      !Array.isArray(area) ||
      area.length < 2 ||
      !Number.isInteger(area[0]) ||
      !Number.isInteger(area[1]) ||
      area[0] < 1 ||
      area[1] < 1
    ) {
      return
    }

    this.area = area
  }

  setPosition(position) {
    const [areaX, areaY] = this.area

    if (
      !Array.isArray(position) ||
      position.length < 3 ||
      !Number.isInteger(position[0]) ||
      !Number.isInteger(position[1]) ||
      position[0] < 0 ||
      position[1] < 0 ||
      position[0] > (areaX - 1) ||
      position[1] > (areaY - 1) ||
      !this.directions.find(direction => direction === position[2])
    ) {
      return
    }

    this.position = position
  }

  getArea() {
    const [axisX, axisY] = this.area    
    return { axisX, axisY }
  }

  getPosition() {
    const [axisX, axisY, direction] = this.position
    return { axisX, axisY, direction }
  }

  rotateLeft() {
    const [E, W, N, S] = this.directions
    const [, , direction] = this.position

    switch(direction) {
      case E:
        this.position[2] = N
        break
      case W:
        this.position[2] = S
        break
      case N:
        this.position[2] = W
        break
      case S:
        this.position[2] = E
        break
    }
  }

  rotateRight() {
    const [E, W, N, S] = this.directions
    const [, , direction] = this.position

    switch(direction) {
      case E:
        this.position[2] = S
        break
      case W:
        this.position[2] = N
        break
      case N:
        this.position[2] = E
        break
      case S:
        this.position[2] = W
        break
    }
  }

  move() {
    const [areaX, areaY] = this.area
    const [E, W, N, S] = this.directions
    const [axisX, axisY, direction] = this.position

    if (
      (axisX === 0 && direction === W) ||
      (axisX === (areaX - 1) && direction === E) ||
      (axisY === 0 && direction === S) ||
      (axisY === (areaY - 1) && direction === N)
    ) {
      return
    }

    switch (direction) {
      case E:
        this.position[0] = axisX + 1
        break
      case W:
        this.position[0] = axisX - 1
        break
      case N:
        this.position[1] = axisY + 1
        break
      case S:
        this.position[1] = axisY - 1
        break
    }
  }

  excute(commands) {
    if (!Array.isArray(commands)) {
      return
    }

    const [L, R, M] = this.commands

    commands.forEach(cmd => {
      switch(cmd) {
        case L:
          this.rotateLeft()
          break
        case R:
          this.rotateRight()
          break
        case M:
          this.move()
          break
      }
    })
  }
}

module.exports = VacuumCleaner