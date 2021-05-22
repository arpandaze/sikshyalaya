from typing import List
from pydantic import Json

personalNotes: List[Json] = [
    {
        "user_id": 3,
        "tags": ["Maths","Computer","Chemistry"],
        "title" : "titleOne",
        "content": """
            [{"type":"paragraph","children":[{"text":"12322Style too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
        """,
    },
    {
        "user_id": 3,
        "tags": ["mathematics","computer","physics"],
        "title" : "titleTwo",
        "content": """
          [{"type":"paragraph","children":[{"text":"2213134134 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 4,
        "tags": ["Chemistry","Science","Pharma"],
        "title" : "titleThree",
        "content": """
          [{"type":"paragraph","children":[{"text":"5635463456 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 5,
        "tags": ["mathematics","computer","physics"],
        "title" : "title Four",
        "content": """
          [{"type":"paragraph","children":[{"text":"5364573453452345 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 6,
        "tags": ["mathematics","computer","physics"],
        "title" : "title Five",
        "content": """
          [{"type":"paragraph","children":[{"text":"6754845684568 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 7,
        "tags": ["mathematics","computer","physics"],
        "title" : "title Six",
        "content": """
          [{"type":"paragraph","children":[{"text":"423648658 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 8,
        "tags": ["mathematics","computer","physics"],
        "title" : "title seven",
        "content": """
          [{"type":"paragraph","children":[{"text":"6383475687 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 9,
        "tags": ["mathematics","computer","physics"],
        "title" : "title eight",
        "content": """
          [{"type":"paragraph","children":[{"text":"6585468568 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 10,
        "tags": ["mathematics","computer","physics"],
        "title" : "title Nine",
        "content": """
          [{"type":"paragraph","children":[{"text":"6846584568 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 4,
        "tags": ["mathematics","computer","physics"],
        "title" : "title ten",
        "content": """
          [{"type":"paragraph","children":[{"text":"687578765 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 5,
        "tags": ["mathematics","computer","physics"],
        "title" : "title eleven",
        "content": """
          [{"type":"paragraph","children":[{"text":"568456874568 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 7,
        "tags": ["mathematics","computer","physics"],
        "title" : "title twelve",
        "content": """
          [{"type":"paragraph","children":[{"text":"345745684658 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 8,
        "tags": ["mathematics","computer","physics"],
        "title" : "title thirteen",
        "content": """
          [{"type":"paragraph","children":[{"text":"3475684568 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 3,
        "tags": ["mathematics","computer","physics"],
        "title" : "title fourteen",
        "content": """
          [{"type":"paragraph","children":[{"text":"346746584658 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
    {
        "user_id": 9,
        "tags": ["mathematics","computer","physics"],
        "title" : "title Fifteen",
        "content": """
          [{"type":"paragraph","children":[{"text":"346845685648 too own civil out along. Perfectly offending attempted add arranging age gentleman concluded. "}]},{"type":"paragraph","children":[{"text":"Get who uncommonly our expr","underline":true},{"text":"ession ten increasing considered occasional travelling. Ev"},{"text":"er read tell year give may men call its. Piqued son turned fat income played end wicket. To do noisy downs round","bold":true},{"text":" an happy books.  "}]}]
          """,
    },
]
