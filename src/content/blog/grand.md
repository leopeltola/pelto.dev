---
title: 'Devlog #0 - Untitled Strategy Game'
description: 'Lorem ipsum dolor sit amet'
pubDate: '2023-10-30'
heroImage: '/placeholder-hero.jpg'
tags: ['Bevy', 'Gamedev']
draft: true
---

I'm working on a 4x/grand strategy game using Rust and The Bevy game engine. I have decided to start writing these devlogs mainly to keep myself publicly accountable but also as a way to perhaps help others solving similar technical challenges. That being said, I likely won't go into minute technical details in these posts but instead will provide high-level overviews of how I have implemented various systems.

I've been making games for years but until now I predominantly used Godot. The ease of use, Godot's FOSS-nature, and comfort with what I already knew appealed to me. However, for this project I decided to change both the game engine and the language. I will likely write a longer post on the reasons at some point change but to summarize: the extensive features provided by Godot aren't that useful for my game and furthermore I found myself working against Godot's Node-based architecture instead of being elevated by it. The data and computing-intensive nature of the game meant I wanted to model data in very specific ways. Even using C# (I refuse to learn C++ on moral grounds) I felt Godot was slowing me down.

Therefore, Bevy. The engine aims to compete with Godot and other mainstream engines in the future but for now it's still lacking in this nature. The features just aren't there. However, what Bevy does have is an efficient and ergonomic ECS that makes working on my game a breeze. All this in Rust and automatically multithreaded. Top-down strategy games, even if 3D like mine, don't need extensive rendering features. Instead they are often CPU-bound as the size of the simulated world grows; a problem which Bevy helps solve.

## About the game

The untitled as-of-yet game will be a pausable real-time fantasy 4x grand strategy game. Usually the terms 4x and grand strategy are considered separate with grand strategy games having pre-set worlds and scenarios while 4x games are usually characterized by symmetric, procedural starts. Games that inspire me include but are not limited to Stellaris, HOMM 3, Dwarf Fortress, and Crusader Kings 3.

## So, where am I?

The project is still in very early stages. I didn't have previous Rust experience so a lot of my time has been spent simply learning the paradigm and getting comfortable with writing Rust. I did a couple of tiny Bevy projects (A rollback-multiplayer game and a simple rts-like boid simulation) and then moved on to working on the actual game.

### Structure

I'm not happy with the structure yet so I won't spend too much time on it. Bevy's schedules are a pleaure to use but my current setup will fall under its own weight without refactoring. I need to build it so that adding multiplayer, a nice-to-have feature, later won't require fundamental changes.

### Regions

Screenshot of regions

The game map consists of regions, each of which has one city in them. The player starts owning one and may then acquire additional regions by settling, conquering, or other means. I distribute the region centers using poisson-disc sampling, an algorithm that ensures a certain distance between each point. I also calculate the delaunay triangulation along with voroi cells to get the region borders and neighboring regions. As you can see in the screenshot the cities are just boxes. I want to build a system which distributes small houses at the city location based on city population but that's a future endeavor. For now it's enough

### Terrain

Most strategy games are flat. The game is basically 2D but presented in 3D. My game will be somewhat similar in that the world is flat but I would like to try and add a bit more variation to the terrain. I implement the terrain as a heightmap generated from gradient noise. I currently have simple but satisfactory chunking and LOD systems in place. The mesh generation works well but I will have to fix the normals at some point. Right now they are only calculated per-chunk resulting in ugly seams between chunk borders. As it doesn't affect any other systems it's low on my priorities.

I also took a try at shaders in Bevy. It's just a dead-simple angle based coloring shader but I will expand it later on. I want to implement a biome system at some point, hopefully sooner than later. But I am dreading having to implement tri-planar texture projection as I am allergic to matrices.

Screenshot of terrain

### Final notes

In addition to the aforementioned I have spent my time reading about game design. While I find enjoyment in building various systems I would prefer to not have to redo them over and over again in case they aren't suitable for the larger game. I'm implementing the features I know are good and fundamental to the game I imagine first and only then the secondary ones.

The one pain point in my plan is user interface. Godot's built-in UI solution is one of if not _the_ best I have used, period. Based on my research and experimentation nothing in the Rust ecosystem comes close to it:

- Bevy UI
  - The built-in UI system in Bevy isn't good yet. It's untested, lacking features, and slow to develop with. It will be improved in the future but I estimate my project will be too far by then to convert to it.
- Egui
  - A Rust UI implementation inspired by Dear ImGui. Most examples and uses online are of quick debug interfaces with lacking or no styling at all. In addition, being an immediate-mode GUI, it's not as performant as a retained mode one. Grand strategy games tend to have a lot of UI that can get complex. There's a danger that the library will eat into the game's CPU frame time budget. However, making custom widgets is both well supported and documented which is a considerable benefit.
- Dioxus, Iced

For the next update I will prioritize refactoring the project structure, implementing armies, and merging regions and terrain into something that can be built upon.
