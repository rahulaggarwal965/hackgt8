import math
from textdistance import Levenshtein

def generate_graph(slides):
    # first paragraph of each slide text will be automatically added to the global "priority hashmap"

    references = {}

    for slide in slides:
        references[slide.paragraph[0]] = slide.index

    memo = {}

    for slide in slides:
        for keyword in slide.keywords: 
            min_edit_distance = math.inf
            for key in references:
                if (keyword, key) in memo:
                    edit_distance = memo[(keyword, key)]
                else:
                    edit_distance = memo[(keyword, key)] = Levenshtein.distance(keyword, key)
                if (edit_distance < min_edit_distance):
                    min_edit_distance = edit_distance
            if (min_edit_distance > 5): # NOTE(rahul): 5 is arbitrary
                # reference not found
                references[keyword] = slide.index

                

    return references
