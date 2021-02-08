---
title: five things you should do in a new minecraft world
date: 2021-02-08T18:17:38.258Z
description: some tips to make your block game experience much more fun
draft: true
---
# Set a world border

This seems like a crazy thing to do, why limit yourself in a procedural world? but there is some logic to it. not only does it reduce file size and help regulate yourself from exploring too far outwards, but it will also be really useful when an update comes around. when Minecraft is updated, only chunks you have not loaded are updated. this means that if you explore too far outwards you will need to go super far away from home. if you add a world border, this issue is resolved. I recommend starting off with a 3000x3000 border and increasing it 1000 blocks every update. this depends on what you need, of course, but for a long term survival World you will be thanking yourself. 

you can do this by

1. going to where you want to place the world border
2. entering `/worldborder set 3000`
3. for future increases do `/worldborder add 1000`

# Configure your world to back up automatically

The worst feeling is when you go to open a Minecraft world and it just went poof. chances are its your fault, but who cares. thats not fun. luckily, there is a way to easily backup your worlds daily.

1. create a .bat file and open it with a text editor
2. enter into the editor `robocopy "%appdata%\.minecraft\saves" "<destination directory>\saves saves_%date:~%" /e /xf` where your destination directory is where you want to save the files. save it.
3. open task scedualer, go to actions, and click 'Create basic task'
4. fill out the fields, add the .bat you just made, and set it to daily.
