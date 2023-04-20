export class Enemy {
  private _name: string;
  private _maxHealth: number;
  private _health: number;
  private _damage: number;
  private _idleImages: string[];
  private _attackImages: string[];
  private _deadImages: string[];
  private _hurtImages: string[];
  private _currentImages: string[];

  constructor(
    name: string,
    maxHealth: number,
    damage: number,
    idleImages: string[],
    attackImages: string[],
    deadImages: string[],
    hurtImages: string[]
  ) {
    this._name = name;
    this._maxHealth = maxHealth;
    this._health = maxHealth;
    this._damage = damage;
    this._idleImages = idleImages;
    this._attackImages = attackImages;
    this._deadImages = deadImages;
    this._hurtImages = hurtImages;
    this._currentImages = idleImages;

    window.setTimeout(() => {
      this._health = 0;
    }, 1000);
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter maxHealth
   * @return {number}
   */
  public get maxHealth(): number {
    return this._maxHealth;
  }

  /**
   * Getter health
   * @return {number}
   */
  public get health(): number {
    return this._health;
  }

  /**
   * Getter damage
   * @return {number}
   */
  public get damage(): number {
    return this._damage;
  }

  /**
   * Getter idleImages
   * @return {string[]}
   */
  public get idleImages(): string[] {
    return this._idleImages;
  }

  /**
   * Getter attackImages
   * @return {string[]}
   */
  public get attackImages(): string[] {
    return this._attackImages;
  }

  /**
   * Getter deadImages
   * @return {string[]}
   */
  public get deadImages(): string[] {
    return this._deadImages;
  }

  /**
   * Getter hurtImages
   * @return {string[]}
   */
  public get hurtImages(): string[] {
    return this._hurtImages;
  }

  /**
   * Getter currentImages
   * @return {string[]}
   */
  public get currentImages(): string[] {
    return this._currentImages;
  }

  public takeDamage(damage: number) {
    this._health -= damage;

    if (this._health <= 0) {
      this.die();
    }
  }

  public loopAnimation(): boolean {
    if (this._currentImages === this._idleImages) {
      return true;
    }

    return false;
  }

  public attack() {}

  private die() {}
}
