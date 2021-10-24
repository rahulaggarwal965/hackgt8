import math
from textdistance import levenshtein
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

sw = stopwords.words('english')

def phrase_similarity(a, b):
    # don't want to worry about case sensitive
    a, b = a.lower(), b.lower()

    a_list, b_list = word_tokenize(a), word_tokenize(b)

    a_set, b_set = {word for word in a_list if not word in sw}, {word for word in b_list if not word in sw}
    l1, l2 = [], []

    rvector = a_set.union(b_set) 
    for word in rvector:
        if word in a_set: l1.append(1)
        else: l1.append(0)
        if word in b_set: l2.append(1)
        else: l2.append(0)
    c = 0
    for i in range(len(rvector)):
            c+= l1[i]*l2[i]
    if c == 0:
        return 0
    cosine = c / float((sum(l1)*sum(l2))**0.5)
    return cosine

def generate_graph(slides):
    # first paragraph of each slide text will be automatically added to the global "priority hashmap"

    references = {}

    for slide in slides:
        references[slide.paragraphs[0].lower()] = slide.index

    memo = {}

    for slide in slides:
        slide.references = []
        for keyword in slide.keywords: 
            max_similarity = -math.inf
            best_key = None
            similarities = [(phrase_similarity(keyword, key), references[key]) for key in references]
            similarities = sorted(similarities, reverse=True)

            if similarities[0][0] > 0.2:
                slide.references.append([])
                i = 0
                while (similarities[i][0] > 0.2):
                    slide.references[-1].append(similarities[i][1])
                    i += 1
            else:
                references[keyword] = slide.index
                slide.references.append([slide.index])



            # for key in references:
            #     # if (keyword, key) in memo:
            #     #     similarity = memo[(keyword, key)]
            #     # else:
            #     #     similarity = memo[(keyword, key)] = phrase_similarity(keyword, key)
            #     similarity = phrase_similarity(keyword, key)
            #     if (similarity > max_similarity):
            #         max_similarity = similarity
            #         best_key = key
            # if (max_similarity < 0.2): # NOTE(rahul): 0.2 is arbitrary
               # reference not found
            #     references[keyword] = slide.index
            # else:
            #     print(f"dist[a={keyword}, b={best_key}] = {max_similarity}")
            #     print(f"a.index = {slide.index}, b.index = {references[best_key]}")


                

    return references
