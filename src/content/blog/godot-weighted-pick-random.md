---
title: 'How to pick a weighted random element from an array in GDScript'
description: ''
pubDate: '2024-05-29'
heroImage: '/placeholder-hero.jpg'
draft: false
---

Here's an easy-to-use pick weighted random element from an array function in GDScript.

The colons (`:`) mean that the variables infer their type from the context instead of typing them explicitly, e.g. `var msg: String = "hello"` is the same as `var msg := "hello"`. It does not affect the usage. The double hashtags are [documentation comments](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html).

```gdscript
## Returns a weighted random value from the target array using the second argument as the weights. Prints an error and returns null if the array is empty.
func weighted_pick_random(array: Array, weights: Array):
	assert(array.size() == weights.size(), "The arrays must be of the same size")
	if array.is_empty():
		push_error("Tried picking a weighted random value from an empty array")
		return null
	var sum := 0.0
	for num in weights:
		sum += num
	var rand := randf_range(0, sum)
	var cumulative := 0.0
	for i in array.size():
		cumulative += weights[i]
		if rand <= cumulative:
			return array[i]
	assert(false, "This should never happen")
```

You can use the function like this:

```gdscript
func _ready():
	var vals := [
		"a",
		"b",
		"c",
	]
	var weights := [
		1,
		10,
		5,
	]
	var value = weighted_pick_random(vals, weights)
```