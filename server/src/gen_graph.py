import math
from textdistance import levenshtein

def generate_graph(slides):
    # first paragraph of each slide text will be automatically added to the global "priority hashmap"

    references = {}

    for slide in slides:
        references[slide.paragraphs[0].lower()] = slide.index

    memo = {}

    for slide in slides:
        for keyword in slide.keywords: 
            min_edit_distance = math.inf
            best_key = None
            for key in references:
                if (keyword, key) in memo:
                    edit_distance = memo[(keyword, key)]
                else:
                    edit_distance = memo[(keyword, key)] = levenshtein(keyword, key)
                if (edit_distance < min_edit_distance):
                    min_edit_distance = edit_distance
                    best_key = key
            if (min_edit_distance > 5): # NOTE(rahul): 5 is arbitrary
                # reference not found
                references[keyword] = slide.index
            else:
                print(f"edit_distance[a={keyword}, b={best_key}] = {min_edit_distance}")


                

    return references
