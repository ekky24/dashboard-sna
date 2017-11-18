TAG_RULE = {
	"B": [
		{
			"prev": ("S", "E", ""),
			"next": ("S", "B", ""),
			"change": "S"
		}
	],
	"I": [
		{
			"prev": ("S", "E", ""),
			"next": ("S", "B", ""),
			"change": "S"
		},
		{
			"prev": ("B","I"),
			"next": ("S", "B", ""),
			"change": "E"
		},
		{
			"prev": (),
			"next": (),
			"change": "E"
		}
	],
	"E": [
		{
			"prev": ("S", "E", ""),
			"next": ("B", "I", "S", ""),
			"change": "S"
		},
		{
			"prev": ("E", "S"),
			"next": ("E"),
			"change": "B"
		}
	]
}

def sanitize_tags (auto_tag):
	word_tags_length = len(auto_tag)
	word_tags_last = word_tags_length - 1
	
	for i in range(0, word_tags_length):
		if (auto_tag[i]["tags"][0] != 'S'):
			prev_tag = ""
			next_tag = ""
			
			if (i > 0):
				prev_tag = auto_tag[i-1]["tags"][0]
				
			if (i < word_tags_last):
				next_tag = auto_tag[i+1]["tags"][0]
				
			used_rule = TAG_RULE[auto_tag[i]["tags"][0]]
			
			for j in range(0, len(used_rule)):
				if (prev_tag in used_rule[j]["prev"] and next_tag in used_rule[j]["next"]):
					auto_tag[i]["tags"] = used_rule[j]["change"] + auto_tag[i]["tags"][1:] 
					break
				