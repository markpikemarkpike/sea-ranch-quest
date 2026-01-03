/**
 * Sea Ranch Quest - Shared Design System
 *
 * Barbara Stauffacher Solomon-inspired visual language
 * All levels should import and use these constants and utilities
 */

const SeaRanchStyle = {

    // ═══════════════════════════════════════════════════════════
    // COLOR PALETTE - STRICT, DO NOT DEVIATE
    // ═══════════════════════════════════════════════════════════

    colors: {
        // Supergraphic accents (use sparingly, boldly)
        red: '#C41E3A',
        blue: '#2E5DA8',

        // Nature tones
        meadow: '#7A9B6D',
        wood: '#8B7355',
        woodLight: '#a89070',
        sand: '#d4c4a8',
        sky: '#87CEEB',
        oceanDeep: '#1a5a7a',
        oceanMid: '#2a7a9a',
        oceanLight: '#3a9aba',

        // Neutrals
        black: '#1a1a1a',
        white: '#FFFFFF',
        cream: '#f5f5f0',
        fog: '#e8e4dc',

        // Functional
        textDark: '#1a1a1a',
        textLight: '#f5f5f0',
        textMuted: '#8b7355'
    },

    // ═══════════════════════════════════════════════════════════
    // TYPOGRAPHY
    // ═══════════════════════════════════════════════════════════

    fonts: {
        // Base font stack - always use this
        family: "'Helvetica Neue', Helvetica, Arial, sans-serif",

        // Preset styles for consistency across levels
        title: {
            font: "bold 32px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: -1
        },
        titleLarge: {
            font: "bold 48px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: -2
        },
        subtitle: {
            font: "400 14px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 2
        },
        hud: {
            font: "bold 12px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 0.5
        },
        hudSmall: {
            font: "bold 10px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 0.5
        },
        hudLarge: {
            font: "bold 14px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 0.5
        },
        body: {
            font: "400 14px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 0
        },
        bodySmall: {
            font: "400 12px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 0
        },
        label: {
            font: "bold 9px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 1
        },
        score: {
            font: "bold 24px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 0
        },
        dialog: {
            font: "400 16px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 0
        },
        speaker: {
            font: "bold 11px 'Helvetica Neue', Helvetica, Arial, sans-serif",
            letterSpacing: 2
        }
    },

    /**
     * Apply a font preset to the canvas context
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} preset - name of the font preset (title, subtitle, hud, etc.)
     */
    setFont(ctx, preset) {
        const fontStyle = this.fonts[preset];
        if (fontStyle) {
            ctx.font = fontStyle.font;
            // Note: letterSpacing requires ctx.letterSpacing which isn't widely supported
            // so we store it for reference but don't apply it directly
        } else {
            // Default fallback
            ctx.font = `400 14px ${this.fonts.family}`;
        }
    },

    /**
     * Create a font string with custom size using Sea Ranch font stack
     * @param {number} size - font size in pixels
     * @param {string} weight - 'bold', '400', '700', etc.
     * @returns {string} CSS font string
     */
    makeFont(size, weight = '400') {
        return `${weight} ${size}px ${this.fonts.family}`;
    },

    // ═══════════════════════════════════════════════════════════
    // DRAWING UTILITIES
    // ═══════════════════════════════════════════════════════════

    /**
     * Draw a supergraphic curve (like the pool ceiling)
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - start x
     * @param {number} y - start y
     * @param {number} radius - curve radius
     * @param {number} thickness - line thickness
     * @param {string} color - stroke color
     * @param {number} startAngle - in radians
     * @param {number} endAngle - in radians
     */
    drawCurve(ctx, x, y, radius, thickness, color, startAngle = 0, endAngle = Math.PI / 2) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();
        ctx.restore();
    },

    /**
     * Draw multiple concentric curves (signature BSS element)
     */
    drawConcentricCurves(ctx, x, y, startRadius, count, gap, thickness, color, startAngle = 0, endAngle = Math.PI / 2) {
        for (let i = 0; i < count; i++) {
            this.drawCurve(ctx, x, y, startRadius + (i * gap), thickness, color, startAngle, endAngle);
        }
    },

    /**
     * Draw a bold arrow/chevron (like the red arrow on wood)
     */
    drawArrow(ctx, x, y, size, color, direction = 'up') {
        ctx.save();
        ctx.fillStyle = color;
        ctx.translate(x, y);

        const rotations = { up: 0, right: Math.PI/2, down: Math.PI, left: -Math.PI/2 };
        ctx.rotate(rotations[direction] || 0);

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size * 0.6, 0);
        ctx.lineTo(-size * 0.2, 0);
        ctx.lineTo(-size * 0.2, size * 0.8);
        ctx.lineTo(size * 0.2, size * 0.8);
        ctx.lineTo(size * 0.2, 0);
        ctx.lineTo(size * 0.6, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    },

    /**
     * Draw the iconic BSS heart shape
     */
    drawHeart(ctx, x, y, size, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.translate(x, y);

        ctx.beginPath();
        ctx.moveTo(0, size * 0.3);
        ctx.bezierCurveTo(-size * 0.5, -size * 0.3, -size, size * 0.1, 0, size);
        ctx.bezierCurveTo(size, size * 0.1, size * 0.5, -size * 0.3, 0, size * 0.3);
        ctx.fill();

        ctx.restore();
    },

    // ═══════════════════════════════════════════════════════════
    // UI COMPONENTS
    // ═══════════════════════════════════════════════════════════

    /**
     * Draw standard HUD box - Sea Ranch style with shadow
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - left position
     * @param {number} y - top position
     * @param {string} text - display text
     * @param {Object} options - styling options
     * @returns {Object} { width, height } of the drawn box
     */
    drawHudBox(ctx, x, y, text, options = {}) {
        const padding = options.padding || 8;
        const fontSize = options.fontSize || 12;
        const minWidth = options.minWidth || 0;

        ctx.save();
        ctx.font = `bold ${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
        const metrics = ctx.measureText(text);
        const width = Math.max(metrics.width + padding * 2, minWidth);
        const height = fontSize + padding * 2;

        // Shadow
        ctx.fillStyle = this.colors.black;
        ctx.fillRect(x + 3, y + 3, width, height);

        // Box
        ctx.fillStyle = options.bgColor || this.colors.cream;
        ctx.fillRect(x, y, width, height);

        // Border
        ctx.strokeStyle = this.colors.black;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Text
        ctx.fillStyle = options.textColor || this.colors.black;
        ctx.textAlign = options.align || 'left';
        ctx.textBaseline = 'middle';

        const textX = options.align === 'center' ? x + width/2 : x + padding;
        ctx.fillText(text, textX, y + height/2);

        ctx.restore();

        return { width, height };
    },

    /**
     * Draw a HUD with label and value (e.g., "SHEEP: 5")
     */
    drawHudLabel(ctx, x, y, label, value, options = {}) {
        const padding = options.padding || 8;
        const fontSize = options.fontSize || 12;

        ctx.save();
        ctx.font = `bold ${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;

        const labelText = `${label} `;
        const valueText = String(value);
        const labelWidth = ctx.measureText(labelText).width;
        const valueWidth = ctx.measureText(valueText).width;
        const width = labelWidth + valueWidth + padding * 2;
        const height = fontSize + padding * 2;

        // Shadow
        ctx.fillStyle = this.colors.black;
        ctx.fillRect(x + 3, y + 3, width, height);

        // Box
        ctx.fillStyle = this.colors.cream;
        ctx.fillRect(x, y, width, height);

        // Border
        ctx.strokeStyle = this.colors.black;
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Label (muted)
        ctx.fillStyle = this.colors.wood;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, x + padding, y + height/2);

        // Value (bold, optionally colored)
        ctx.fillStyle = options.valueColor || this.colors.black;
        ctx.fillText(valueText, x + padding + labelWidth, y + height/2);

        ctx.restore();

        return { width, height };
    },

    /**
     * Draw multiple HUD items in a row (top of screen)
     * @param {CanvasRenderingContext2D} ctx
     * @param {Array} items - array of {label, value, color?} objects
     * @param {Object} options - { y, padding, fontSize, align: 'left'|'right'|'spread' }
     */
    drawHudRow(ctx, items, options = {}) {
        const y = options.y || 12;
        const gap = options.gap || 12;
        const align = options.align || 'left';
        const canvasWidth = ctx.canvas.width;
        const margin = options.margin || 12;

        // Calculate total width
        let totalWidth = 0;
        const itemWidths = items.map(item => {
            ctx.font = `bold ${options.fontSize || 12}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
            const text = item.value !== undefined ? `${item.label} ${item.value}` : item.label;
            return ctx.measureText(text).width + 16; // padding
        });
        totalWidth = itemWidths.reduce((a, b) => a + b, 0) + (items.length - 1) * gap;

        let startX;
        if (align === 'left') {
            startX = margin;
        } else if (align === 'right') {
            startX = canvasWidth - margin - totalWidth;
        } else { // spread
            startX = margin;
        }

        let currentX = startX;
        items.forEach((item, i) => {
            if (item.value !== undefined) {
                this.drawHudLabel(ctx, currentX, y, item.label, item.value, {
                    valueColor: item.color,
                    fontSize: options.fontSize
                });
            } else {
                this.drawHudBox(ctx, currentX, y, item.label, {
                    textColor: item.color,
                    fontSize: options.fontSize
                });
            }
            currentX += itemWidths[i] + gap;
        });
    },

    /**
     * Draw a simple text label (no box) - for minimal HUD
     */
    drawHudText(ctx, x, y, text, options = {}) {
        const fontSize = options.fontSize || 12;

        ctx.save();
        ctx.font = `bold ${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
        ctx.textAlign = options.align || 'left';
        ctx.textBaseline = options.baseline || 'top';

        // Optional shadow for readability
        if (options.shadow !== false) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillText(text, x + 1, y + 1);
        }

        ctx.fillStyle = options.color || this.colors.cream;
        ctx.fillText(text, x, y);

        ctx.restore();
    },

    /**
     * Draw weathered wood/cream background (like menu)
     */
    drawMenuBackground(ctx) {
        const W = ctx.canvas.width;
        const H = ctx.canvas.height;

        // Base gradient - cream to sand
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, this.colors.cream);
        grad.addColorStop(1, this.colors.sand);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Subtle wood grain lines
        ctx.strokeStyle = 'rgba(139, 115, 85, 0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 4) {
            if (Math.random() > 0.7) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
                ctx.stroke();
            }
        }

        // Weathering spots
        ctx.fillStyle = 'rgba(139, 115, 85, 0.06)';
        ctx.beginPath();
        ctx.ellipse(W * 0.2, H * 0.3, 80, 50, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(W * 0.7, H * 0.6, 60, 40, 0, 0, Math.PI * 2);
        ctx.fill();
    },

    /**
     * Draw the blue sweeping curves (like menu supergraphic)
     */
    drawMenuCurves(ctx) {
        const W = ctx.canvas.width;

        ctx.save();
        ctx.strokeStyle = this.colors.blue;
        ctx.lineWidth = 28;
        ctx.lineCap = 'round';

        // Outer curve
        ctx.beginPath();
        ctx.arc(W + 60, -60, 200, Math.PI * 0.5, Math.PI * 0.95);
        ctx.stroke();

        // Inner curve (slightly transparent)
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(W + 60, -60, 140, Math.PI * 0.5, Math.PI * 0.95);
        ctx.stroke();

        ctx.restore();
    },

    /**
     * Draw red arrow accent (like menu)
     */
    drawMenuArrow(ctx, x, y) {
        ctx.save();
        ctx.fillStyle = this.colors.red;

        // Arrow head (triangle pointing up)
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 25, y + 35);
        ctx.lineTo(x + 25, y + 35);
        ctx.closePath();
        ctx.fill();

        // Arrow stem
        ctx.fillRect(x - 8, y + 32, 16, 35);

        ctx.restore();
    },

    /**
     * Draw title card (call at start of level) - matches menu style exactly
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} levelName
     * @param {string} subtitle - descriptive text shown below title
     * @param {string} accentType - 'arrow' (default), 'curves', 'heart', 'minimal'
     */
    drawTitleCard(ctx, levelName, subtitle, accentType = 'arrow') {
        const W = ctx.canvas.width;
        const H = ctx.canvas.height;

        // Weathered cream background (like menu)
        this.drawMenuBackground(ctx);

        // Blue curves in top-right (like menu)
        this.drawMenuCurves(ctx);

        // Accent based on type
        switch(accentType) {
            case 'arrow':
                this.drawMenuArrow(ctx, 50, H - 95);
                break;
            case 'curves':
                // Already have curves, add smaller red ones bottom-left
                ctx.save();
                ctx.strokeStyle = this.colors.red;
                ctx.lineWidth = 12;
                ctx.beginPath();
                ctx.arc(-30, H + 30, 80, -Math.PI * 0.5, 0);
                ctx.stroke();
                ctx.restore();
                break;
            case 'heart':
                this.drawHeart(ctx, 50, H - 70, 40, this.colors.red);
                break;
            case 'minimal':
                // Just the curves, no additional accent
                break;
        }

        // Level name - bold Helvetica like menu
        ctx.fillStyle = this.colors.black;
        ctx.font = "bold 32px 'Helvetica Neue', Helvetica, Arial, sans-serif";
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(levelName, 24, 56);

        // Subtitle - descriptive text
        ctx.fillStyle = this.colors.wood;
        ctx.font = "400 14px 'Helvetica Neue', Helvetica, Arial, sans-serif";
        ctx.letterSpacing = '2px';
        ctx.fillText(subtitle.toUpperCase(), 24, 80);

        // Prompt at bottom
        if (Math.floor(Date.now() / 500) % 2) {
            ctx.fillStyle = this.colors.wood;
            ctx.globalAlpha = 0.6;
            ctx.font = "400 10px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            ctx.textAlign = 'right';
            ctx.fillText('PRESS ENTER TO PLAY', W - 24, H - 20);
            ctx.globalAlpha = 1;
        }

        ctx.textAlign = 'left';
    },

    /**
     * Draw win screen - matches menu style
     */
    drawWinScreen(ctx, message = 'LEVEL COMPLETE', subtitle = null) {
        const W = ctx.canvas.width;
        const H = ctx.canvas.height;

        // Weathered cream background (like menu)
        this.drawMenuBackground(ctx);

        // Blue curves
        this.drawMenuCurves(ctx);

        // Message - like menu title
        ctx.fillStyle = this.colors.black;
        ctx.font = "bold 32px 'Helvetica Neue', Helvetica, Arial, sans-serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const messageY = subtitle ? H * 0.35 : H * 0.4;
        ctx.fillText(message, W/2, messageY);

        // Subtitle if provided
        if (subtitle) {
            ctx.fillStyle = this.colors.wood;
            ctx.font = "400 18px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            ctx.fillText(subtitle, W/2, messageY + 40);
        }

        // Two options: Replay and Menu
        ctx.fillStyle = this.colors.wood;
        ctx.font = "400 12px 'Helvetica Neue', Helvetica, Arial, sans-serif";
        ctx.fillText('A: REPLAY', W/2 - 60, H - 50);
        ctx.fillText('B: MENU', W/2 + 60, H - 50);

        // Blinking hint
        if (Math.floor(Date.now() / 500) % 2) {
            ctx.globalAlpha = 0.5;
            ctx.font = "400 10px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            ctx.fillText('SELECT AN OPTION', W/2, H - 25);
            ctx.globalAlpha = 1;
        }
    },

    /**
     * Draw lose screen (rare, games are forgiving) - matches menu style
     */
    drawLoseScreen(ctx, message = 'TRY AGAIN', subtitle = '') {
        const W = ctx.canvas.width;
        const H = ctx.canvas.height;

        // Weathered cream background
        this.drawMenuBackground(ctx);

        // Blue curves (dimmed)
        ctx.save();
        ctx.globalAlpha = 0.4;
        this.drawMenuCurves(ctx);
        ctx.restore();

        // Message
        ctx.fillStyle = this.colors.wood;
        ctx.font = "bold 32px 'Helvetica Neue', Helvetica, Arial, sans-serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(message, W/2, subtitle ? H * 0.35 : H * 0.4);

        // Subtitle if provided
        if (subtitle) {
            ctx.fillStyle = this.colors.wood;
            ctx.globalAlpha = 0.7;
            ctx.font = "400 16px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            ctx.fillText(subtitle, W/2, H * 0.45);
            ctx.globalAlpha = 1;
        }

        // Two options: Retry and Menu
        ctx.fillStyle = this.colors.wood;
        ctx.font = "400 12px 'Helvetica Neue', Helvetica, Arial, sans-serif";
        ctx.fillText('A: RETRY', W/2 - 60, H - 50);
        ctx.fillText('B: MENU', W/2 + 60, H - 50);

        // Blinking hint
        if (Math.floor(Date.now() / 500) % 2) {
            ctx.globalAlpha = 0.5;
            ctx.font = "400 10px 'Helvetica Neue', Helvetica, Arial, sans-serif";
            ctx.fillText('SELECT AN OPTION', W/2, H - 25);
            ctx.globalAlpha = 1;
        }
    },

    // ═══════════════════════════════════════════════════════════
    // JUICE - SCREEN SHAKE, PARTICLES, EFFECTS
    // ═══════════════════════════════════════════════════════════

    // Screen shake state
    _shake: { x: 0, y: 0, intensity: 0, decay: 0.9 },

    /**
     * Trigger screen shake effect
     * @param {number} intensity - shake magnitude in pixels (default 5)
     * @param {number} decay - how fast shake fades, 0-1 (default 0.9, higher = longer)
     */
    shake(intensity = 5, decay = 0.9) {
        this._shake.intensity = intensity;
        this._shake.decay = decay;
    },

    /**
     * Update shake and get current offset - call at start of render loop
     * @returns {Object} { x, y } offset to apply to ctx.translate()
     */
    updateShake() {
        if (this._shake.intensity > 0.5) {
            this._shake.x = (Math.random() - 0.5) * this._shake.intensity * 2;
            this._shake.y = (Math.random() - 0.5) * this._shake.intensity * 2;
            this._shake.intensity *= this._shake.decay;
        } else {
            this._shake.x = 0;
            this._shake.y = 0;
            this._shake.intensity = 0;
        }
        return { x: this._shake.x, y: this._shake.y };
    },

    /**
     * Apply shake to canvas context - call before drawing
     * @param {CanvasRenderingContext2D} ctx
     */
    applyShake(ctx) {
        const offset = this.updateShake();
        ctx.translate(offset.x, offset.y);
    },

    // Particle system
    _particles: [],

    /**
     * Spawn particles at a location
     * @param {number} x - center x
     * @param {number} y - center y
     * @param {Object} options - { count, color, speed, size, life, spread, gravity }
     */
    spawnParticles(x, y, options = {}) {
        const count = options.count || 8;
        const color = options.color || this.colors.cream;
        const speed = options.speed || 3;
        const size = options.size || 4;
        const life = options.life || 30;
        const spread = options.spread || Math.PI * 2;
        const baseAngle = options.angle || 0;
        const gravity = options.gravity || 0;

        for (let i = 0; i < count; i++) {
            const angle = baseAngle - spread/2 + Math.random() * spread;
            const vel = speed * (0.5 + Math.random() * 0.5);
            this._particles.push({
                x, y,
                vx: Math.cos(angle) * vel,
                vy: Math.sin(angle) * vel,
                size: size * (0.5 + Math.random() * 0.5),
                color,
                life,
                maxLife: life,
                gravity
            });
        }
    },

    /**
     * Spawn a burst of sparkles (for collecting items)
     */
    spawnSparkles(x, y, color = null) {
        this.spawnParticles(x, y, {
            count: 12,
            color: color || this.colors.cream,
            speed: 4,
            size: 3,
            life: 25,
            spread: Math.PI * 2
        });
    },

    /**
     * Spawn celebration burst (for level complete)
     */
    spawnCelebration(x, y) {
        // Multi-color burst
        const colors = [this.colors.red, this.colors.blue, this.colors.cream, this.colors.meadow];
        colors.forEach((color, i) => {
            setTimeout(() => {
                this.spawnParticles(x, y, {
                    count: 15,
                    color,
                    speed: 6,
                    size: 5,
                    life: 40,
                    spread: Math.PI * 2,
                    gravity: 0.1
                });
            }, i * 50);
        });
    },

    /**
     * Update and draw all particles
     * @param {CanvasRenderingContext2D} ctx
     */
    updateParticles(ctx) {
        ctx.save();

        this._particles = this._particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity || 0;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life--;

            if (p.life <= 0) return false;

            const alpha = p.life / p.maxLife;
            const size = p.size * (0.5 + alpha * 0.5);

            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fill();

            return true;
        });

        ctx.restore();
    },

    // Flash effect state
    _flash: { alpha: 0, color: '#fff' },

    /**
     * Trigger a screen flash
     * @param {string} color - flash color (default white)
     * @param {number} intensity - starting opacity 0-1 (default 0.3)
     */
    flash(color = '#fff', intensity = 0.3) {
        this._flash.color = color;
        this._flash.alpha = intensity;
    },

    /**
     * Update and draw screen flash - call at end of render
     * @param {CanvasRenderingContext2D} ctx
     */
    updateFlash(ctx) {
        if (this._flash.alpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = this._flash.alpha;
            ctx.fillStyle = this._flash.color;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
            this._flash.alpha *= 0.85;
        }
    },

    // Slow motion effect
    _timeScale: 1,
    _targetTimeScale: 1,

    /**
     * Set time scale for slow-mo effect
     * @param {number} scale - 0.1 = very slow, 1 = normal
     * @param {number} duration - how long in frames before returning to normal
     */
    setTimeScale(scale, duration = 30) {
        this._timeScale = scale;
        this._targetTimeScale = scale;
        setTimeout(() => {
            this._targetTimeScale = 1;
        }, duration * 16.67); // ~60fps
    },

    /**
     * Get current time scale - multiply your dt by this
     */
    getTimeScale() {
        this._timeScale += (this._targetTimeScale - this._timeScale) * 0.1;
        return this._timeScale;
    },

    // Squash and stretch helper
    /**
     * Calculate squash/stretch scale based on velocity
     * @param {number} vx - horizontal velocity
     * @param {number} vy - vertical velocity
     * @param {number} maxStretch - maximum stretch factor (default 1.3)
     * @returns {Object} { scaleX, scaleY, rotation }
     */
    getSquashStretch(vx, vy, maxStretch = 1.3) {
        const speed = Math.sqrt(vx * vx + vy * vy);
        const stretch = Math.min(1 + speed * 0.05, maxStretch);
        const squash = 1 / stretch; // Preserve volume
        const rotation = Math.atan2(vy, vx);

        return {
            scaleX: stretch,
            scaleY: squash,
            rotation
        };
    },

    // Trail system for movement feedback
    _trails: [],

    /**
     * Add a trail point
     * @param {number} x
     * @param {number} y
     * @param {string} color
     * @param {number} size
     */
    addTrailPoint(x, y, color = null, size = 8) {
        this._trails.push({
            x, y,
            color: color || this.colors.cream,
            size,
            alpha: 0.6,
            life: 15
        });
        // Limit trail length
        if (this._trails.length > 20) {
            this._trails.shift();
        }
    },

    /**
     * Update and draw trails
     * @param {CanvasRenderingContext2D} ctx
     */
    updateTrails(ctx) {
        ctx.save();

        this._trails = this._trails.filter(t => {
            t.life--;
            t.alpha = t.life / 15;
            t.size *= 0.95;

            if (t.life <= 0) return false;

            ctx.globalAlpha = t.alpha * 0.5;
            ctx.fillStyle = t.color;
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
            ctx.fill();

            return true;
        });

        ctx.restore();
    },

    /**
     * Clear all trails (call on level reset)
     */
    clearTrails() {
        this._trails = [];
    },

    /**
     * Master juice update - call once per frame at end of render
     * Handles: particles, trails, flash
     * @param {CanvasRenderingContext2D} ctx
     */
    updateJuice(ctx) {
        this.updateTrails(ctx);
        this.updateParticles(ctx);
        this.updateFlash(ctx);
    },

    /**
     * Reset all juice effects (call on level start/restart)
     */
    resetJuice() {
        this._particles = [];
        this._trails = [];
        this._flash.alpha = 0;
        this._shake.intensity = 0;
        this._timeScale = 1;
        this._targetTimeScale = 1;
    },

    // ═══════════════════════════════════════════════════════════
    // LEVEL COMPLETION ANIMATION
    // ═══════════════════════════════════════════════════════════

    _levelComplete: {
        active: false,
        phase: 0,
        timer: 0,
        callback: null
    },

    /**
     * Trigger level complete sequence
     * @param {Function} callback - called when animation finishes
     */
    triggerLevelComplete(callback = null) {
        this._levelComplete.active = true;
        this._levelComplete.phase = 0;
        this._levelComplete.timer = 0;
        this._levelComplete.callback = callback;

        // Initial celebration
        this.shake(8, 0.92);
        this.flash(this.colors.cream, 0.4);
        this.playSound('success');
    },

    /**
     * Update and draw level complete animation
     * @param {CanvasRenderingContext2D} ctx
     * @returns {boolean} true if animation is active
     */
    updateLevelComplete(ctx) {
        if (!this._levelComplete.active) return false;

        const lc = this._levelComplete;
        lc.timer++;

        const W = ctx.canvas.width;
        const H = ctx.canvas.height;

        // Phase 0: Initial flash and shake (frames 0-30)
        if (lc.phase === 0) {
            if (lc.timer === 15) {
                // Center celebration burst
                this.spawnCelebration(W/2, H/2);
            }
            if (lc.timer >= 30) {
                lc.phase = 1;
                lc.timer = 0;
            }
        }

        // Phase 1: Fade to completion screen (frames 0-60)
        if (lc.phase === 1) {
            const fadeProgress = Math.min(lc.timer / 40, 1);

            // Darken background
            ctx.save();
            ctx.globalAlpha = fadeProgress * 0.7;
            ctx.fillStyle = this.colors.cream;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Draw "COMPLETE" text fading in
            if (fadeProgress > 0.3) {
                ctx.save();
                ctx.globalAlpha = (fadeProgress - 0.3) / 0.7;
                ctx.fillStyle = this.colors.black;
                ctx.font = this.fonts.titleLarge.font;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Slight bounce effect
                const bounce = Math.sin(lc.timer * 0.15) * 5 * (1 - fadeProgress);
                ctx.fillText('COMPLETE', W/2, H/2 - 20 + bounce);
                ctx.restore();
            }

            if (lc.timer >= 60) {
                lc.phase = 2;
                lc.timer = 0;
            }
        }

        // Phase 2: Show continue prompt (frames 0+)
        if (lc.phase === 2) {
            // Full overlay
            ctx.save();
            ctx.globalAlpha = 0.85;
            ctx.fillStyle = this.colors.cream;
            ctx.fillRect(0, 0, W, H);
            ctx.restore();

            // Title
            ctx.fillStyle = this.colors.black;
            ctx.font = this.fonts.titleLarge.font;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('COMPLETE', W/2, H/2 - 20);

            // Blinking prompt
            if (Math.floor(lc.timer / 20) % 2 === 0) {
                ctx.fillStyle = this.colors.wood;
                ctx.font = this.fonts.body.font;
                ctx.fillText('PRESS ENTER TO CONTINUE', W/2, H/2 + 30);
            }

            // Blue curves decoration
            this.drawMenuCurves(ctx);
        }

        return true;
    },

    /**
     * Check if level complete animation allows input
     */
    levelCompleteReady() {
        return this._levelComplete.active && this._levelComplete.phase === 2;
    },

    /**
     * Finish level complete and trigger callback
     */
    finishLevelComplete() {
        if (this._levelComplete.callback) {
            this._levelComplete.callback();
        }
        this._levelComplete.active = false;
        this._levelComplete.phase = 0;
    },

    // ═══════════════════════════════════════════════════════════
    // AUDIO UTILITIES
    // ═══════════════════════════════════════════════════════════

    audioCtx: null,

    initAudio() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioCtx;
    },

    /**
     * Play a soft, filtered sound
     */
    playSound(type = 'click', options = {}) {
        const ctx = this.initAudio();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Always lowpass for softness
        filter.type = 'lowpass';
        filter.frequency.value = options.filterFreq || 800;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch(type) {
            case 'click':
                osc.frequency.value = 600;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'success':
                osc.frequency.value = 440;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.08, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'collect':
                osc.frequency.value = 523;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.06, now);
                osc.frequency.exponentialRampToValueAtTime(784, now + 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
                break;

            case 'soft':
                osc.frequency.value = 300;
                osc.type = 'sine';
                filter.frequency.value = 400;
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'breath-in':
                osc.type = 'sine';
                osc.frequency.value = 200;
                filter.frequency.value = 300;
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.04, now + 1);
                osc.frequency.linearRampToValueAtTime(280, now + 1);
                gain.gain.linearRampToValueAtTime(0.01, now + 1.2);
                osc.start(now);
                osc.stop(now + 1.2);
                break;

            case 'breath-out':
                osc.type = 'sine';
                osc.frequency.value = 280;
                filter.frequency.value = 350;
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 1.5);
                osc.frequency.linearRampToValueAtTime(180, now + 1.5);
                osc.start(now);
                osc.stop(now + 1.5);
                break;

            case 'dodge': {
                // True whoosh using white noise buffer
                osc.disconnect();  // Don't use the oscillator

                // Create noise buffer
                const bufferSize = ctx.sampleRate * 0.4;
                const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const output = noiseBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = Math.random() * 2 - 1;
                }

                const noise = ctx.createBufferSource();
                noise.buffer = noiseBuffer;

                // Bandpass filter for shaped whoosh
                filter.type = 'bandpass';
                filter.frequency.value = 1500;
                filter.Q.value = 0.8;

                noise.connect(filter);
                filter.connect(gain);

                // Volume envelope - swell up then fade
                gain.gain.setValueAtTime(0.0, now);
                gain.gain.linearRampToValueAtTime(0.15, now + 0.1);  // Rise
                gain.gain.linearRampToValueAtTime(0.12, now + 0.2);  // Sustain
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);  // Fade

                // Filter sweep for doppler - high to low
                filter.frequency.setValueAtTime(2500, now);
                filter.frequency.exponentialRampToValueAtTime(800, now + 0.35);

                noise.start(now);
                noise.stop(now + 0.35);
                return;  // Skip the osc.start below
            }

            case 'hit':
                // Unpleasant thud/crunch - low rumble with noise-like quality
                osc.type = 'sawtooth';
                osc.frequency.value = 80;
                filter.frequency.value = 200;
                gain.gain.setValueAtTime(0.15, now);
                osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
                break;
        }
    },

    // ═══════════════════════════════════════════════════════════
    // UTILITY FUNCTIONS
    // ═══════════════════════════════════════════════════════════

    /**
     * Save level completion to localStorage
     */
    saveCompletion(levelNumber) {
        try {
            const completed = JSON.parse(localStorage.getItem('seaRanchQuestCompleted') || '[]');
            if (!completed.includes(levelNumber)) {
                completed.push(levelNumber);
                localStorage.setItem('seaRanchQuestCompleted', JSON.stringify(completed));
            }
        } catch (e) {
            console.warn('Could not save progress');
        }
    },

    /**
     * Setup ESC to return to menu
     */
    setupMenuReturn() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                window.location.href = 'level0-menu.html';
            }
        });
    },

    // Cached grain canvas for performance
    _grainCanvas: null,
    _grainSize: { w: 0, h: 0 },

    /**
     * Create or get cached grain pattern canvas
     * @private
     */
    _getGrainCanvas(width, height) {
        // Regenerate if size changed
        if (!this._grainCanvas || this._grainSize.w !== width || this._grainSize.h !== height) {
            this._grainCanvas = document.createElement('canvas');
            this._grainCanvas.width = width;
            this._grainCanvas.height = height;
            const gCtx = this._grainCanvas.getContext('2d');

            // Generate static noise pattern once
            const imageData = gCtx.createImageData(width, height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const v = Math.random() * 255;
                imageData.data[i] = v;
                imageData.data[i + 1] = v;
                imageData.data[i + 2] = v;
                imageData.data[i + 3] = 40; // Semi-transparent
            }
            gCtx.putImageData(imageData, 0, 0);

            this._grainSize = { w: width, h: height };
        }
        return this._grainCanvas;
    },

    /**
     * Draw film grain overlay for weathered, analog feel
     * Use this at the END of your render loop for consistent texture
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} opacity - 0-1, default 0.08 (subtle)
     */
    drawGrain(ctx, opacity = 0.08) {
        const W = ctx.canvas.width;
        const H = ctx.canvas.height;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = 'overlay';

        const grainCanvas = this._getGrainCanvas(W, H);
        ctx.drawImage(grainCanvas, 0, 0);

        ctx.restore();
    },

    /**
     * Draw animated/flickering grain (subtle movement like old film)
     * Slightly more expensive - use for special scenes
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} opacity - 0-1
     * @param {number} time - animation time (e.g., Date.now() or frame counter)
     */
    drawAnimatedGrain(ctx, opacity = 0.06, time = 0) {
        const W = ctx.canvas.width;
        const H = ctx.canvas.height;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = 'overlay';

        const grainCanvas = this._getGrainCanvas(W, H);

        // Slight offset based on time for subtle flickering
        const offsetX = (Math.sin(time * 0.01) * 2) | 0;
        const offsetY = (Math.cos(time * 0.013) * 2) | 0;

        ctx.drawImage(grainCanvas, offsetX, offsetY);

        ctx.restore();
    },

    /**
     * Draw vignette effect (darker edges, like old photographs)
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} intensity - 0-1, default 0.3
     */
    drawVignette(ctx, intensity = 0.3) {
        const W = ctx.canvas.width;
        const H = ctx.canvas.height;
        const cx = W / 2;
        const cy = H / 2;
        const radius = Math.max(W, H) * 0.7;

        ctx.save();

        const gradient = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, `rgba(0,0,0,${intensity})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, H);

        ctx.restore();
    },

    /**
     * Apply full "weathered" post-processing effect
     * Call at the very end of your render loop
     * @param {CanvasRenderingContext2D} ctx
     * @param {Object} options - { grain: true, vignette: true, grainOpacity: 0.08, vignetteIntensity: 0.2 }
     */
    applyWeatheredEffect(ctx, options = {}) {
        const {
            grain = true,
            vignette = true,
            grainOpacity = 0.08,
            vignetteIntensity = 0.2
        } = options;

        if (vignette) {
            this.drawVignette(ctx, vignetteIntensity);
        }
        if (grain) {
            this.drawGrain(ctx, grainOpacity);
        }
    },

    // ═══════════════════════════════════════════════════════════
    // MOBILE TOUCH CONTROLS
    // ═══════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════
    // RESPONSIVE / MOBILE SUPPORT
    // ═══════════════════════════════════════════════════════════

    _responsive: {
        initialized: false,
        orientation: null
    },

    /**
     * Check if device is mobile (phone/tablet)
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    },

    /**
     * Setup responsive scaling for mobile devices
     * Call this once at page load
     */
    setupResponsive() {
        if (this._responsive.initialized) return;

        // Inject responsive CSS
        const style = document.createElement('style');
        style.id = 'sea-ranch-responsive';
        style.textContent = `
            /* Base responsive styles */
            html, body {
                overflow: hidden;
                position: fixed;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            /* Mobile responsive container */
            @media (max-width: 768px), (pointer: coarse) {
                body {
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: flex-start !important;
                    align-items: center !important;
                    background: #1a1a1a !important;
                }

                #game-container, .game-container, #gameContainer {
                    transform-origin: top center !important;
                    flex-shrink: 0 !important;
                }
            }

            /* Rotate prompt for portrait */
            .rotate-prompt {
                display: none;
                position: fixed;
                bottom: 200px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(26,26,26,0.9);
                color: #f5f5f0;
                padding: 8px 16px;
                border-radius: 20px;
                text-align: center;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 11px;
                z-index: 10000;
                white-space: nowrap;
            }

            @media (orientation: portrait) and (pointer: coarse) {
                .rotate-prompt {
                    display: block;
                }
            }

            @media (orientation: landscape) {
                .rotate-prompt {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Add rotate prompt
        const rotatePrompt = document.createElement('div');
        rotatePrompt.className = 'rotate-prompt';
        rotatePrompt.textContent = '📱 Rotate for best experience';
        document.body.appendChild(rotatePrompt);

        // JavaScript-based scaling for proper fit
        const self = this;
        const scaleGame = function() {
            const container = document.querySelector('#game-container, .game-container, #gameContainer');
            if (!container) return;

            // Detect mobile: touch device OR small screen OR iOS/Android
            const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth <= 768;
            const isMobileUA = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isMobile = isTouch || isSmallScreen || isMobileUA;

            if (!isMobile) {
                container.style.transform = '';
                container.style.webkitTransform = '';
                container.style.marginTop = '';
                return;
            }

            const gameWidth = 640;
            const gameHeight = 480;
            const controlsHeight = 180; // Space for touch controls
            const padding = 10;

            // Use visualViewport if available (better for Safari)
            const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            const availableHeight = viewportHeight - controlsHeight - padding;

            // Calculate scale to fit both width and height
            const scaleX = (viewportWidth - padding * 2) / gameWidth;
            const scaleY = availableHeight / gameHeight;
            const scale = Math.min(scaleX, scaleY, 1); // Never scale up, only down

            // Apply transform with webkit prefix for Safari
            const transformValue = 'scale(' + scale + ')';
            container.style.transform = transformValue;
            container.style.webkitTransform = transformValue;
            container.style.transformOrigin = 'top center';
            container.style.webkitTransformOrigin = 'top center';

            // Center vertically in available space
            const scaledHeight = gameHeight * scale;
            const topMargin = Math.max(padding, (availableHeight - scaledHeight) / 2);
            container.style.marginTop = topMargin + 'px';

            // Update orientation class
            const isLandscape = viewportWidth > viewportHeight;
            document.body.classList.toggle('is-landscape', isLandscape);
            document.body.classList.toggle('is-portrait', !isLandscape);
            self._responsive.orientation = isLandscape ? 'landscape' : 'portrait';
        };

        // Run on load and resize
        window.addEventListener('resize', scaleGame);
        window.addEventListener('orientationchange', function() { setTimeout(scaleGame, 150); });

        // Safari's visualViewport API for better resize handling
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', scaleGame);
        }

        // Run after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', scaleGame);
        } else {
            scaleGame();
        }
        // Run after delays to catch Safari's viewport changes
        setTimeout(scaleGame, 100);
        setTimeout(scaleGame, 500);

        this._responsive.initialized = true;
    },

    _touchControls: {
        enabled: false,
        container: null,
        activeKeys: new Set()
    },

    /**
     * Check if device is touch-capable
     */
    isTouchDevice() {
        return ('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0) ||
               (navigator.msMaxTouchPoints > 0);
    },

    /**
     * Dispatch a synthetic keyboard event
     */
    _dispatchKey(key, type) {
        const event = new KeyboardEvent(type, {
            key: key,
            code: key === ' ' ? 'Space' : `Key${key.toUpperCase()}`,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    },

    /**
     * Handle touch start on a button
     */
    _handleTouchStart(key, element) {
        if (!this._touchControls.activeKeys.has(key)) {
            this._touchControls.activeKeys.add(key);
            this._dispatchKey(key, 'keydown');
            element.classList.add('active');

            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }
    },

    /**
     * Handle touch end on a button
     */
    _handleTouchEnd(key, element) {
        if (this._touchControls.activeKeys.has(key)) {
            this._touchControls.activeKeys.delete(key);
            this._dispatchKey(key, 'keyup');
            element.classList.remove('active');
        }
    },

    /**
     * Create the touch control overlay
     * Call this after your game container is set up
     * @param {Object} options - { showDpad: true, showAB: true, showMenu: true, showRotate: false }
     */
    setupTouchControls(options = {}) {
        // Always setup responsive scaling for mobile
        this.setupResponsive();

        // Skip on non-touch devices (but allow forcing for testing)
        if (!this.isTouchDevice() && !options.force) {
            return;
        }

        // Don't create twice
        if (this._touchControls.enabled) {
            return;
        }

        const {
            showDpad = true,
            showAB = true,
            showMenu = true,
            showRotate = false
        } = options;

        // Inject CSS
        const style = document.createElement('style');
        style.textContent = `
            .touch-controls {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 180px;
                pointer-events: none;
                z-index: 9999;
                display: none;  /* Hidden by default on desktop */
                justify-content: space-between;
                align-items: flex-end;
                padding: 20px;
                box-sizing: border-box;
            }

            /* Show touch controls only on mobile/touch devices */
            @media (max-width: 768px) {
                .touch-controls {
                    display: flex;
                }
            }
            @media (pointer: coarse) {
                .touch-controls {
                    display: flex;
                }
            }

            .touch-dpad {
                position: relative;
                width: 140px;
                height: 140px;
                pointer-events: auto;
            }

            .touch-btn {
                position: absolute;
                background: rgba(245, 245, 240, 0.85);
                border: 3px solid #1a1a1a;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-weight: bold;
                font-size: 18px;
                color: #1a1a1a;
                user-select: none;
                -webkit-user-select: none;
                touch-action: manipulation;
                transition: transform 0.05s, background 0.05s;
            }

            .touch-btn.active {
                background: #2E5DA8;
                color: #f5f5f0;
                transform: scale(0.95);
            }

            /* D-pad buttons */
            .touch-dpad .touch-btn {
                width: 44px;
                height: 44px;
            }

            .touch-dpad .touch-up {
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }
            .touch-dpad .touch-up.active {
                transform: translateX(-50%) scale(0.95);
            }

            .touch-dpad .touch-down {
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
            .touch-dpad .touch-down.active {
                transform: translateX(-50%) scale(0.95);
            }

            .touch-dpad .touch-left {
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            .touch-dpad .touch-left.active {
                transform: translateY(-50%) scale(0.95);
            }

            .touch-dpad .touch-right {
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            .touch-dpad .touch-right.active {
                transform: translateY(-50%) scale(0.95);
            }

            /* Center of d-pad (optional visual) */
            .touch-dpad::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 30px;
                height: 30px;
                background: rgba(139, 115, 85, 0.3);
                border-radius: 50%;
                pointer-events: none;
            }

            /* Action buttons */
            .touch-actions {
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: flex-end;
                pointer-events: auto;
            }

            .touch-actions-row {
                display: flex;
                gap: 10px;
            }

            .touch-action-btn {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                font-size: 20px;
            }

            .touch-btn-a {
                background: rgba(196, 30, 58, 0.9);
                color: #f5f5f0;
                border-color: #a01830;
            }
            .touch-btn-a.active {
                background: #C41E3A;
                transform: scale(0.92);
            }

            .touch-btn-b {
                background: rgba(46, 93, 168, 0.9);
                color: #f5f5f0;
                border-color: #1e4d88;
            }
            .touch-btn-b.active {
                background: #2E5DA8;
                transform: scale(0.92);
            }

            /* Menu button */
            .touch-menu-btn {
                position: fixed;
                top: 10px;
                right: 10px;
                width: 44px;
                height: 44px;
                border-radius: 8px;
                font-size: 12px;
                pointer-events: auto;
                z-index: 9999;
                display: none;  /* Hidden by default on desktop */
            }

            /* Show menu button only on mobile/touch devices */
            @media (max-width: 768px) {
                .touch-menu-btn {
                    display: flex;
                }
            }
            @media (pointer: coarse) {
                .touch-menu-btn {
                    display: flex;
                }
            }

            /* Rotate button (for driftwood level) */
            .touch-rotate-btn {
                width: 44px;
                height: 44px;
                border-radius: 8px;
                font-size: 14px;
            }

            /* Arrows for d-pad */
            .arrow-icon {
                font-size: 20px;
                line-height: 1;
            }

            /* Hide on landscape orientation with small height */
            @media (max-height: 400px) and (orientation: landscape) {
                .touch-controls {
                    height: 120px;
                    padding: 10px;
                }
                .touch-dpad {
                    width: 100px;
                    height: 100px;
                }
                .touch-dpad .touch-btn {
                    width: 32px;
                    height: 32px;
                    font-size: 14px;
                }
                .touch-action-btn {
                    width: 44px;
                    height: 44px;
                    font-size: 16px;
                }
            }
        `;
        document.head.appendChild(style);

        // Create container
        const container = document.createElement('div');
        container.className = 'touch-controls';

        // D-pad
        if (showDpad) {
            const dpad = document.createElement('div');
            dpad.className = 'touch-dpad';

            const directions = [
                { key: 'ArrowUp', cls: 'touch-up', label: '\u25B2' },
                { key: 'ArrowDown', cls: 'touch-down', label: '\u25BC' },
                { key: 'ArrowLeft', cls: 'touch-left', label: '\u25C0' },
                { key: 'ArrowRight', cls: 'touch-right', label: '\u25B6' }
            ];

            directions.forEach(({ key, cls, label }) => {
                const btn = document.createElement('div');
                btn.className = `touch-btn ${cls}`;

                const arrowSpan = document.createElement('span');
                arrowSpan.className = 'arrow-icon';
                arrowSpan.textContent = label;
                btn.appendChild(arrowSpan);

                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this._handleTouchStart(key, btn);
                }, { passive: false });

                btn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this._handleTouchEnd(key, btn);
                }, { passive: false });

                btn.addEventListener('touchcancel', (e) => {
                    this._handleTouchEnd(key, btn);
                });

                dpad.appendChild(btn);
            });

            container.appendChild(dpad);
        } else {
            // Empty spacer
            container.appendChild(document.createElement('div'));
        }

        // Action buttons
        if (showAB || showRotate) {
            const actions = document.createElement('div');
            actions.className = 'touch-actions';

            const row = document.createElement('div');
            row.className = 'touch-actions-row';

            if (showRotate) {
                const rotateBtn = document.createElement('div');
                rotateBtn.className = 'touch-btn touch-rotate-btn';
                rotateBtn.textContent = 'R';

                rotateBtn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this._handleTouchStart('r', rotateBtn);
                }, { passive: false });

                rotateBtn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this._handleTouchEnd('r', rotateBtn);
                }, { passive: false });

                row.appendChild(rotateBtn);
            }

            if (showAB) {
                // B button
                const bBtn = document.createElement('div');
                bBtn.className = 'touch-btn touch-action-btn touch-btn-b';
                bBtn.textContent = 'B';

                bBtn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this._handleTouchStart('b', bBtn);
                }, { passive: false });

                bBtn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this._handleTouchEnd('b', bBtn);
                }, { passive: false });

                row.appendChild(bBtn);

                // A button (Enter/Space equivalent)
                const aBtn = document.createElement('div');
                aBtn.className = 'touch-btn touch-action-btn touch-btn-a';
                aBtn.textContent = 'A';

                aBtn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    // A dispatches both 'a' and 'Enter' for menu compatibility
                    this._handleTouchStart('a', aBtn);
                    this._dispatchKey('Enter', 'keydown');
                    this._dispatchKey(' ', 'keydown');
                }, { passive: false });

                aBtn.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    this._handleTouchEnd('a', aBtn);
                    this._dispatchKey('Enter', 'keyup');
                    this._dispatchKey(' ', 'keyup');
                }, { passive: false });

                row.appendChild(aBtn);
            }

            actions.appendChild(row);
            container.appendChild(actions);
        }

        document.body.appendChild(container);

        // Menu button (fixed position, separate from main controls)
        if (showMenu) {
            const menuBtn = document.createElement('div');
            menuBtn.className = 'touch-btn touch-menu-btn';
            menuBtn.textContent = 'ESC';

            menuBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this._handleTouchStart('Escape', menuBtn);
            }, { passive: false });

            menuBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this._handleTouchEnd('Escape', menuBtn);
            }, { passive: false });

            document.body.appendChild(menuBtn);
        }

        this._touchControls.enabled = true;
        this._touchControls.container = container;

        console.log('Sea Ranch Quest: Touch controls enabled');
    },

    /**
     * Remove touch controls (if needed)
     */
    removeTouchControls() {
        if (this._touchControls.container) {
            this._touchControls.container.remove();
            const menuBtn = document.querySelector('.touch-menu-btn');
            if (menuBtn) menuBtn.remove();
            this._touchControls.enabled = false;
            this._touchControls.container = null;
        }
    }
};

// Export for use in levels
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SeaRanchStyle;
}
