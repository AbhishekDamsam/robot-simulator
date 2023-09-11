import { Orientation } from './constants';
import Robot, { evaluate } from './robot-simulator'

describe('Robot', () => {
  const robot = new Robot();

  it('robot bearing', () => {
    const directions = [...Object.values(Orientation)];

    directions.forEach((currentDirection) => {
      const bearing = robot.orient(currentDirection).bearing!;
      expect(bearing).toEqual(currentDirection);
    })
  })

  it('turn right from north', () => {
    const bearing = robot.orient(Orientation.north).turnRight().bearing!;
    expect(bearing).toEqual('east');
  })

  it('turn right from east', () => {
    const bearing = robot.orient(Orientation.east).turnRight().bearing!;
    expect(bearing).toEqual('south');
  })

  it('turn right from south', () => {
    const bearing = robot.orient(Orientation.south).turnRight().bearing!;
    expect(bearing).toEqual('west');
  })

  it('turn right from west', () => {
    const bearing = robot.orient(Orientation.west).turnRight().bearing!;
    expect(bearing).toEqual('north');
  })

  it('turn left from north', () => {
    const bearing = robot.orient(Orientation.north).turnLeft().bearing!;
    expect(bearing).toEqual('west');
  })

  it('turn left from east', () => {
    const bearing = robot.orient(Orientation.east).turnLeft().bearing!;
    expect(bearing).toEqual('north');
  })

  it('turn left from south', () => {
    const bearing = robot.orient(Orientation.south).turnLeft().bearing!;
    expect(bearing).toEqual('east');
  })

  it('turn left from west', () => {
    const bearing = robot.orient(Orientation.west).turnLeft().bearing!;
    expect(bearing).toEqual('south');
  })

  it('robot coordinates', () => {
    const coordinates = robot.at(3, 0).coordinates;
    expect(coordinates).toEqual([3, 0]);
  })

  it('other robot coordinates', () => {
    const coordinates = robot.at(-2, 5).coordinates;
    expect(coordinates).toEqual([-2, 5]);
  })

  it('advance when facing north', () => {
    const coordinates = robot.at(0, 0).orient(Orientation.north).advance().coordinates;
    expect(coordinates).toEqual([0, 1]);
  })

  it('advance when facing east', () => {
    const coordinates = robot.at(0, 0).orient(Orientation.east).advance().coordinates;
    expect(coordinates).toEqual([1, 0]);
  })

  it('advance when facing south', () => {
    const coordinates = robot.at(0, 0).orient(Orientation.south).advance().coordinates;
    expect(coordinates).toEqual([0, -1]);
  })

  it('advance when facing west', () => {
    const coordinates = robot.at(0, 0).orient(Orientation.west).advance().coordinates;
    expect(coordinates).toEqual([-1, 0]);
  })

  it('instruct one robot', () => {
    const robot = evaluate('RLAALALP', new Robot(-2, 1, 'east'));
    expect(robot.coordinates).toEqual([0, 2]);
    expect(robot.bearing!).toEqual('west');
  })

  it('instruct multiple robots', () => {
    const robot1 = evaluate('LAAARALA', new Robot(0, 0, 'north'));
    expect(robot1.coordinates).toEqual([-4, 1]);
    expect(robot1.bearing).toEqual('west');

    const robot2 = evaluate('RRAAAAALA', new Robot(2, -7, 'east'));
    expect(robot2.coordinates).toEqual([-3, -8]);
    expect(robot2.bearing).toEqual('south');

    const robot3 = evaluate('LAAARRRALLLL', new Robot(8, 4, 'south'));
    expect(robot3.coordinates).toEqual([11, 5]);
    expect(robot3.bearing).toEqual('north');
  })
})
