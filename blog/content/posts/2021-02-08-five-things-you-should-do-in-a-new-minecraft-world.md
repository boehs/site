---
title: Five things you should do in a new minecraft world
date: 2021-02-08T18:17:38.258Z
description: some tips to make your block game experience much more fun
tags:
  - Minecraft
  - Gaming
draft: false
---
# Set a world border
This seems like a crazy thing to do, why limit yourself in a procedural world? but there is some logic to it. not only does it reduce file size and help regulate yourself from exploring too far outwards, but it will also be really useful when an update comes around. when Minecraft is updated, only chunks you have not loaded are updated. this means that if you explore too far outwards you will need to go super far away from home. if you add a world border, this issue is resolved. I recommend starting with a 3000x3000 border and increasing it by 1000 blocks every update. this depends on what you need, of course, but for a long-term survival World, you will be thanking yourself.
you can do this by
1. going to where you want to place the world border
2. entering `/worldborder set 3000`
3. for future increases do `/worldborder add 1000`
# Configure your world to back up automatically
The worst feeling is when you go to open a Minecraft world and it just went poof. chances are it's your fault, but who cares. That's not fun. luckily, there is a way to easily backup your worlds daily.
1. create a `.bat` file and open it with a text editor
enter into the editor `robocopy "%appdata%.minecraft\saves" "<destination directory>\saves saves_%date:~%" /e /xf` where your destination directory is where you want to save the files. save it.
3. open task scheduler, go to actions, and click 'Create basic task'
4. fill out the fields, add the .bat you just made, and set it to daily.
# Become a farmer
This is a bit later game, but you should still be able to achieve it early in your journey. I would recommend making these 3 farms to everybody.
## Villager farm
This farm is needed if you plan to make an iron farm, and it sure as hell is funny. villager breeders are zero maintenance, the only issue you will face is trafficking the villagers to their new home using minecarts. once you do, however, this video is amazing at showing you what you need to do at that point

{{< youtube https://www.youtube.com/watch?v=oeesCRfaabg >}}
## Iron farm
Did you make a villager farm? great, now use what you made to mass-produce iron. this takes 3 villagers but after that, it's nearly free

{{< youtube https://www.youtube.com/watch?v=MMsYeKntoEI >}}
## Porkchop farm
This one is next to free once you acquire an ender pearl - and nets you unlimited food.

{{< youtube https://www.youtube.com/watch?v=GlgCZbHSk6c >}}
# Create a storage area
It seems silly, but this is major. it's so often I end up with a full inventory and end up ditching items I need later to be able to collect more of the items I need *now*. the inventory problem is a big issue, and cutting out an area to fill to the brim with LABLED double chests will help you in the long run when you need something.
# Make camp somewhere exotic
I only built-in plains. so flat, and not abundantly ugly, but lately in my new worlds I have switched it up and it has been super fun. try building in the ocean, desert, taiga, forest, etc. New locations provide new challenges helping you be more creative in your builds.