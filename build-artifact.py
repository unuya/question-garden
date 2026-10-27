# Builds artifact/question-garden.html: one self-contained page for a Claude artifact (answers via the `sample` capability).
import re
from pathlib import Path
src=Path('docs');html=(src/'index.html').read_text(encoding='utf-8')
body=re.search(r'<body>(.*)</body>',html,re.S).group(1)
body=re.sub(r'<script[^>]*></script>','',body)
css=''.join((src/n).read_text(encoding='utf-8') for n in ['style.css','cute.css','tablet.css'])
js=[(src/n).read_text(encoding='utf-8') for n in ['app.js','report.js','tablet.js']]+[Path('artifact/claude.js').read_text(encoding='utf-8')]
head='<title>궁금한 교실</title>\n<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@400;600;700;800&display=swap">\n'
out=head+'<style>'+css+'</style>\n'+body.strip()+'\n'+''.join('<script>'+j.replace('</script','<\\/script')+'</script>\n' for j in js)
Path('artifact/question-garden.html').write_text(out,encoding='utf-8');print('built',len(out))
