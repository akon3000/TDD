const chia = require('chai')
const VacuumCleaner = require('./vacuumCleaner')

const { expect, should } = chia

should()

describe('Check function Vacuum cleaner', () => {

  let vacuumCleaner

  beforeEach(() => {
    vacuumCleaner = new VacuumCleaner()
    vacuumCleaner.setArea([6, 6])
    vacuumCleaner.setPosition([0, 0, 'N'])
  })
  
  it('expect can create vacuum cleaner.', () => {
    expect(vacuumCleaner).to.be.a('object')
  })

  it('should get area of vacuum cleaner.', () => {
    const result = vacuumCleaner.getArea()

    result.should.be.a('object')
    expect(result.axisX).to.equal(6)
    expect(result.axisY).to.equal(6)
  })

  it('should get position of vacuum cleaner.', () => {
    const result = vacuumCleaner.getPosition()

    result.should.be.a('object')
    expect(result.axisX).to.equal(0)
    expect(result.axisY).to.equal(0)
    expect(result.direction).to.equal('N')
  })

  it('expect vacuum cleaner direction can rotate left.', () => {
    vacuumCleaner.excute(['L'])

    const result = vacuumCleaner.getPosition()

    expect(result.direction).to.equal('W')
  })

  it('expect vacuum cleaner direction can rotate right.', () => {
    vacuumCleaner.excute(['R'])

    const result = vacuumCleaner.getPosition()

    expect(result.direction).to.equal('E')
  })

  it('expect vacuum cleaner can move go ahed.', () => {
    vacuumCleaner.excute(['M'])

    const result = vacuumCleaner.getPosition()

    expect(result.axisY).to.equal(1)
  })

  it('expect vacuum cleaner can not move if ahead not have position.', () => {
    vacuumCleaner.excute(['L', 'M'])

    const result = vacuumCleaner.getPosition()

    expect(result.axisX).to.equal(0)
    expect(result.axisY).to.equal(0)
  })

})