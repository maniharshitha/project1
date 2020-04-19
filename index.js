$(function(){ 
    var anim_id;
    var container=$('#container'),
         line=$('#line'),
         line_1=$('#line-1'),
         line_2=$('#line-2'),
         line_3=$('#line-3'),
         car=$('#car'),
         car_1=$('#car-1'),
         car_2=$('#car-2'),
         car_3=$('#car-3'),
         car_4=$('#car_4'),
         car_5=$('#car_5'),
         restart_div=$("#restart-div"),
         restart_btn=$("#restart"),
         score=$("#score");
        var container_left=parseInt(container.css('left')),
            container_width=parseInt(container.width()),
            container_height=parseInt(container.height()),
            car_width=parseInt(car.width()),
            car_height=parseInt(car.height());
        var game_over=false,
        score_counter=1,
        car_speed=2,
        line_speed=5;
        var move_right=false,
            move_left=false,
            move_up=false,
            move_down=false;

        $(document).on('keydown',function(e){
            if(game_over === false)
            {
                var key=e.keyCode;
                if(key === 37&&move_left === false)
                {
                    move_left=requestAnimationFrame(left);
                }
                else
                if(key===39&&move_right===false)
                {
                   move_right=requestAnimationFrame(right);
                }
                else
                if(key===38&&move_up===false)
                {
                   move_up=requestAnimationFrame(up);
                }
                else
                if(key===40&&move_down===false)
                {
                   move_down=requestAnimationFrame(down);
                }
            }  
        });

        $(document).on('keyup',function(e)
        {
            if(game_over===false)
            {
                var key=e.keyCode;
                if(key===37){
                    cancelAnimationFrame(move_left);
                    move_left=false;
                }
                else
                if(key===39)
                {
                    cancelAnimationFrame(move_right);
                    move_right=false;
                }
                else
                if(key===38)
                {
                    cancelAnimationFrame(move_up);
                    move_up=false;
                }
                else
                if(key===40)
                {
                    cancelAnimationFrame(move_down);
                    move_down=false;
                }
            }
        });
          
        function left(){
            if(game_over === false&&parseInt(car.css('left'))>0)
            {
                car.css('left',parseInt(car.css('left'))-5);
                move_left=requestAnimationFrame(left);
            }
        }

        function right()
        {
            if(game_over===false&&parseInt(car.css('left'))<container_width-car_width)
            {
                car.css('left',parseInt(car.css('left'))+5);
                move_right=requestAnimationFrame(right);
            }
        }
        function up()
        {
            if(game_over===false&&parseInt(car.css('top'))>0)
            {
                car.css('top',parseInt(car.css('top'))-5);
                move_up=requestAnimationFrame(up);
            }
        }
        function down()
        {
            if(game_over===false&&parseInt(car.css('top'))<container_height-car_height)
            {
                car.css('top',parseInt(car.css('top'))+5);
                move_down=requestAnimationFrame(down);
            }
        }

         anim_id=requestAnimationFrame(repeat);
        function repeat()
        {
            if(game_over==false){
                if(collapsion(car,car_1)||collapsion(car,car_2)||collapsion(car,car_3))
                stop_game();

            score_counter++;
            if(score_counter%20==0)
            {
                score.text(parseInt(score.text())+1);
            }
            if(score_counter%500==0)
            {
                car_speed++;
                line_speed++;
            }
            car_down(car_1);
            car_down(car_2);
            car_down(car_3);
            car_down(car_4);
            car_down(car_5);
            line_down(line_1);
            line_down(line_2);
            line_down(line_3);
            anim_id=requestAnimationFrame(repeat);
         }}
         function car_down(car){
             var current_top=parseInt(car.css('top'));
             if(current_top>container_height)
             {
                 current_top=-200;
                 var car_left=parseInt(Math.random()*(container_width-car_width));
                 car.css('left',car_left);
             }
             car.css('top',current_top+car_speed);

         }
         function line_down(line){
             var l_current_top=parseInt(line.css('top'));
             if(l_current_top>(container_height)){
                 l_current_top=-300;
             }
             line.css('top',l_current_top+line_speed);
         } 
         function stop_game(){
             game_over=true;
             cancelAnimationFrame(anim_id);
             cancelAnimationFrame(move_left);
             cancelAnimationFrame(move_right);
             cancelAnimationFrame(move_up);
             cancelAnimationFrame(move_down);
             restart_div.slideDown();
             restart_btn.focus(); 
         }
         restart_btn.click(function(){
             location.reload();
         });

         function collapsion($elem1,$elem2){
             var x1=$elem1.offset().left,
             y1=$elem1.offset().top,
             x2=$elem2.offset().left,
             y2=$elem2.offset().top,
             h1=$elem1.outerHeight(true),
             w1=$elem1.outerWidth(true),
             h2=$elem2.outerHeight(true),
             w2=$elem2.outerWidth(true),
             b1=y1+h1,
             r1=x1+w1,
             b2=y2+h2,
             r2=x2+w2;
             if(b1<y2||y1>b2||r1<x2||x1>r2){
             return false;}
             return true;

         }
	var el = document.getElementsByTagName("canvas")[0];
	el.addEventListener("touchstart", handleStart);
	el.addEventListener("touchmove", handleMove);
	el.addEventListener("touchend", handleEnd);
	el.addEventListener("touchcancel", handleCancel);

});