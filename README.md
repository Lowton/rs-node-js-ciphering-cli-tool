# RS Node.js Ciphering CLI Tool
## Description
This is CLI tool that can encode and decode a text.
To run app use command:
```bash
$ node cli-tool <args>
```
CLI tool can accept 3 options (short alias and full name):

1.  **-c, --config**: config for ciphers
    Config is a string with pattern `{XY(-)}n`, where:
* `X` is a cipher mark:
    * `C` is for [Caesar cipher][caesar] (with shift 1)
    * `A` is for [Atbash cipher][atbash]
    * `R` is for [ROT-8 as variation of ROT-13][rot13]
* `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

**Usage example:**

```bash
$ node cli-tool -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```bash
$ node cli-tool -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```bash
$ node cli-tool -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```bash
$ node cli-tool -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`

[caesar]: https://en.wikipedia.org/wiki/Caesar_cipher
[atbash]: https://en.wikipedia.org/wiki/Atbash
[rot13]: https://en.wikipedia.org/wiki/ROT13