export class HUD {
  private container!: HTMLElement;
  private staminaBar!: HTMLElement;
  private xpBar!: HTMLElement;
  private levelDisplay!: HTMLElement;
  private scoreDisplay!: HTMLElement;

  constructor() {
    this.createHUD();
  }

  private createHUD() {
    // Main container
    this.container = document.createElement('div');
    this.container.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-50';
    document.body.appendChild(this.container);

    // Stamina bar
    const staminaContainer = document.createElement('div');
    staminaContainer.className = 'absolute bottom-4 left-4 bg-gray-800 bg-opacity-75 rounded-lg p-4';
    
    const staminaLabel = document.createElement('div');
    staminaLabel.className = 'text-white text-sm mb-2';
    staminaLabel.textContent = 'Stamina';
    
    this.staminaBar = document.createElement('div');
    this.staminaBar.className = 'w-48 h-4 bg-gray-600 rounded-full overflow-hidden';
    
    const staminaFill = document.createElement('div');
    staminaFill.className = 'h-full bg-green-500 transition-all duration-300';
    staminaFill.style.width = '100%';
    
    this.staminaBar.appendChild(staminaFill);
    staminaContainer.appendChild(staminaLabel);
    staminaContainer.appendChild(this.staminaBar);
    this.container.appendChild(staminaContainer);

    // XP bar
    const xpContainer = document.createElement('div');
    xpContainer.className = 'absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 rounded-lg p-4';
    
    const xpLabel = document.createElement('div');
    xpLabel.className = 'text-white text-sm mb-2';
    xpLabel.textContent = 'XP';
    
    this.xpBar = document.createElement('div');
    this.xpBar.className = 'w-48 h-4 bg-gray-600 rounded-full overflow-hidden';
    
    const xpFill = document.createElement('div');
    xpFill.className = 'h-full bg-blue-500 transition-all duration-300';
    xpFill.style.width = '35%';
    
    this.xpBar.appendChild(xpFill);
    xpContainer.appendChild(xpLabel);
    xpContainer.appendChild(this.xpBar);
    this.container.appendChild(xpContainer);

    // Level display
    this.levelDisplay = document.createElement('div');
    this.levelDisplay.className = 'absolute top-4 right-4 bg-gray-800 bg-opacity-75 rounded-lg px-4 py-2';
    this.levelDisplay.innerHTML = '<span class="text-white text-lg font-bold">Level 1</span>';
    this.container.appendChild(this.levelDisplay);

    // Score display
    this.scoreDisplay = document.createElement('div');
    this.scoreDisplay.className = 'absolute top-20 right-4 bg-gray-800 bg-opacity-75 rounded-lg px-4 py-2';
    this.scoreDisplay.innerHTML = '<span class="text-white text-lg font-bold">Score: 0</span>';
    this.container.appendChild(this.scoreDisplay);

    // Controls hint
    const controlsHint = document.createElement('div');
    controlsHint.className = 'absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-75 rounded-lg px-4 py-2';
    controlsHint.innerHTML = '<span class="text-white text-sm">WASD: Move | Space: Jump | Mouse: Look</span>';
    this.container.appendChild(controlsHint);
  }

  public updateStamina(stamina: number, maxStamina: number) {
    const percentage = (stamina / maxStamina) * 100;
    const fill = this.staminaBar.firstElementChild as HTMLElement;
    if (fill) {
      fill.style.width = `${percentage}%`;
      
      // Change color based on stamina
      if (percentage > 50) {
        fill.className = 'h-full bg-green-500 transition-all duration-300';
      } else if (percentage > 25) {
        fill.className = 'h-full bg-yellow-500 transition-all duration-300';
      } else {
        fill.className = 'h-full bg-red-500 transition-all duration-300';
      }
    }
  }

  public updateXP(currentXP: number, maxXP: number) {
    const percentage = (currentXP / maxXP) * 100;
    const fill = this.xpBar.firstElementChild as HTMLElement;
    if (fill) {
      fill.style.width = `${percentage}%`;
    }
  }

  public updateLevel(level: number) {
    this.levelDisplay.innerHTML = `<span class="text-white text-lg font-bold">Level ${level}</span>`;
  }

  public updateScore(score: number) {
    this.scoreDisplay.innerHTML = `<span class="text-white text-lg font-bold">Score: ${score}</span>`;
  }

  public dispose() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
