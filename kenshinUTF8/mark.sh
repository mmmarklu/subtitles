declare -i var1
var2="woeifjweofj"
var1 = 1
for f in *.ssa
do
    echo "$f"
    echo $var1
#    cat $f | sed -E '/^Dialogue:/!d' | sed -E 's/^Dialogue: Marked=[0-9],[0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9],[0-9]:[0-9][0-9]:[0-9][0-9].[0-9][0-9],Default,NTP,0000,0000,0000,!Effect,//' | sed -E 's/\{\\fsp\(-2\)\}//' | sed -E 's/ //g' > temp/${f%.ssa}.txt
done
echo $var2

