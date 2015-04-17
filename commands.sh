find . -type file -name \*.ssa -exec sh -c "cat {} | iconv -f BIG5-2003 -t utf8 > /Users/mlu/temp/{}" \;


cat 02.ssa | iconv -f BIG5-2003 -t utf8

cat mark.sh | sed -E 's/(\[[^\x00-\x7F]*DVD\] [^\x00-\x7F]*)([0-9][0-9])([^\x00-\x7F].*)/mv \"\1\2\3\" \2.ssa/' > mark.ssh

cat 02.cht.ssa | sed -E '/^Dialogue:/!d' | sed -E 's/^Dialogue: Marked=[0-9],[0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9],[0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9],Default,NTP,0000,0000,0000,!Effect,//' | sed -E 's/\{\\fsp\(-2\)\}//' | sed -E 's/ //g'

cat "The Other Guys.cht.srt" | sed -E '/^[0-9]+$/d' | sed -E '/^[0-9][0-9]:[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9] --> [0-9][0-9]:[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9]$/d' 
