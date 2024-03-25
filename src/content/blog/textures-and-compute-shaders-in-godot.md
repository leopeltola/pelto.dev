---
title: 'Textures and Compute Shaders in Godot 4'
description: 'Lorem ipsum dolor sit amet'
pubDate: '2023-07-18'
heroImage: '/placeholder-hero.jpg'
tags: ['Godot', 'Gamedev']
draft: false
---

I recently took the leap and started learning compute shaders to use them in procedural terrain generation. As there are few resources on how to use them in Godot I figured I would write a short article of my experience. This isn't a tutorial but more an overview of problems and tips I wish I had been aware of.

Two resources I found particularly helpful are the <a href="https://docs.godotengine.org/en/4.1/tutorials/shaders/compute_shaders.html" target="_blank">Godot documentation</a> and the <a href="https://github.com/godotengine/godot-demo-projects/tree/master/misc/compute_shader_heightmap" target="_blank">Heightmap Demo</a>. I recommend reading both thoroughly. <a href="https://surma.dev/things/webgpu/" target="_black">This article</a> by Surma helped me better understand how GPUs work in general even though it's about WebGPU.

I used Godot 4.1 for this article. It is possible that the API will change in the future as compute shader support is very new. It's also possible that the language will change. Currently compute shaders are written in GLSL while regular shaders use Godot's own unnamed shader language. The current experience isn't very user-friendly and I hope this inconsistency will be fixed in the future.

## Texture formats

Compute shaders require you to specify the data layout/format of the texture you are using. Generally you need to decide how many of the channels (red, blue, green, alpha) and how many bits per channel you need. You don't need to think of them as colors - they can represent anything you want.

For example the official heightmap demo uses an `r8` layout for the heightmap. This is roughly short for "red: 8 bits" and means that every pixel in the texture only has 8 bits (=256 values) in one channel of information (red). If you wanted more precision you could use `r16` or `r32` which would give you 16 or 32 bits per pixel respectively. These are all unsigned floats, which means that they can't represent negative values.

```gdscript
layout(r8, binding = 0) uniform image2D heightmap;
```

You specify the format in the compute shader using the `layout` keyword. You need to match this in Godot when you create the texture:

```gdscript
var normalmap_format := RDTextureFormat.new()
# UNORM means unsigned normalized float, [0.0, 1.0]
normalmap_format.format = RenderingDevice.DATA_FORMAT_R8_UNORM
```

To tie up the whole data format you also need to specify the width and height of the texture. This is done in Godot with the `width` and `height` properties of the `RDTextureFormat` class:

```gdscript
normalmap_format.width = size.x
normalmap_format.height = size.y
```

You can always use more channels and bits than you need but it will increase the memory usage and the time it takes to process the texture. All the shader-side formats are listed <a href="https://www.khronos.org/opengl/wiki/Layout_Qualifier_(GLSL)#Image_formats" target="_blank">here</a>. You can see Godot's RenderingDevice equivalents in <a href="https://docs.godotengine.org/en/4.1/classes/class_renderingdevice.html#enum-renderingdevice-dataformat" target="_blank">the documentation</a>.

### Godot's Image class

Something that the official documentation and demo don't cover well is the Image class' `format` property. When I was first trying to use textures in a compute shader I kept getting errors about the number of expected bits not matching what I was passing to the GPU. Turns out that `Image` has a `format` property that you need to set to match the format you are using in your compute shader. You can do this using the `convert` method.

```gdscript
# heightmap: Image
heightmap.convert(Image.FORMAT_R8)
rd.texture_update(heightmap_rid, 0, heightmap.get_data())
```

You also specify the format when converting the output data from the GPU:

```gdscript
var output_bytes := rd.texture_get_data(normalmap_rid, 0)
normalmap = Image.create_from_data(size.x, size.y, false, Image.FORMAT_RGBA8, output_bytes)
```

The `Image` class uses the same `DataFormat` enumeration <a href="https://docs.godotengine.org/en/4.1/classes/class_renderingdevice.html#enum-renderingdevice-dataformat" target="_blank">here</a>.

## Alternative

Note that you can also store a texture in an array. I won't go into detail here but the basic gist of it is to have an array of length width \* height storing the values. Then, in your shader you manually calculate the coordinate of your pixel. As far as I understand this is more cache-friendly which might result in better performance compared to textures. As always with minute optimizations like these you should test it for your use case.
