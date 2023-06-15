class ColorControl{
    constructor(color_list, steps){
        this.body_obj = document.getElementById("color_block");
        this.colors = color_list;  // The colors to cycle through
        this.transition_time = steps;  // How long the transition between two colors should take
        this.color_index = -1; // The index of the color we're transitioning away from
        this.distance = [0, 0, 0];  // The amount of distance between the two colors for each color channel
        this.timer = get_epoch();  // Timer object
        this.next_color();
    }
    
    next_color(value = 1){
        this.color_index = (this.color_index + value) % this.colors.length;
        let next_index = (this.color_index + 1) % this.colors.length;
        for(let i = 0;i < 3;i++){
            this.distance[i] = this.colors[next_index][i] - this.colors[this.color_index][i];
        }
    }
    
    tick(){
        let current_time = get_epoch();
        let elapsed_time = current_time - this.timer;
        if(elapsed_time >= this.transition_time){  //  Change to the next color
            this.next_color(Math.floor(elapsed_time / this.transition_time));
            elapsed_time = elapsed_time % this.transition_time;
            this.timer = get_epoch() - elapsed_time;
        }
        let current_color = [0, 0, 0];
        for(let i = 0;i < 3;i++){
            // x = channel_distance * (elapsed_time / transition_time);
            current_color[i] = this.colors[this.color_index][i] + this.distance[i] * (elapsed_time / this.transition_time);
        }
        this.body_obj.style.background = `rgb(${current_color[0]}, ${current_color[1]}, ${current_color[2]})`;
    }
}


function get_epoch(){
    return Date.now() / 1000;
}


function mainloop(){
    color_obj.tick();
    window.requestAnimationFrame(mainloop);
}


let color_obj = new ColorControl([[255, 0, 0], [255, 127, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255],
                                  [75, 0, 130], [148, 0, 211]], 0.8);
mainloop();
