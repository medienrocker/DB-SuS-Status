function generateXML(repetitions) {
    const template = `<field>
<type>date</type>
<name>Anfang{{num}}</name>
<required>0</required>
</field>

<field>
<type>date</type>
<name>Ende{{num}}</name>
<required>0</required>
</field>

<field>
<type>text</type>
<name>Beruf{{num}}</name>
<required>0</required>
</field>

<field>
<type>textarea</type>
<name>Kontakt{{num}}</name>
<required>0</required>
<param2>35</param2>
<param3>10</param3>
<param4>1</param4>
<param5>0</param5>
</field>

<field>
<type>multimenu</type>
<name>Praktikumstage{{num}}</name>
<required>0</required>
<param1>Mo
DI
Mi
Do
Fr</param1>
</field>`;

    for (let i = 1; i <= repetitions; i++) {
        let formattedNumber = i.toString().padStart(1, '0');
        console.log(template.replaceAll('{{num}}', formattedNumber));
    }
}

// Example usage: generate XML 200 times
generateXML(13);