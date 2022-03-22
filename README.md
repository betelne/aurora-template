## inPage
# Šablona AURORA

Styly jsou psané v [SASSu](https://sass-lang.com/documentation), využívají nezkompilovaný [Bootstrap 5](https://getbootstrap.com/docs/5.1/getting-started/download/) (též v SASSu), selectory se řídí ve většině případů konvencí [BEM](https://www.vzhurudolu.cz/prirucka/bem).

&nbsp;

1. [Struktura souborů](#files)
2. [Proměnné](#vars)
3. [Selectory a BEM](#selectors-bem)
4. [Selectory a Bootstrap](#selectors-bs)
5. [Responzivita](#responsivity)
6. [Mixiny](#mixins)
7. [Podpora prohlížečů](#browsers)
8. [Doporučení k úpravám](#edit)

&nbsp;

## Struktura souborů <a id="files"></a>
Složka scss má dva adresáře — base a components.

`base` –  obecné věci, jako proměnné, funkce, věci týkající se layoutu a typografie obecně apod.

`components` – styly jsou pro přehlednost rozděleny do souborů podle jednotlivých komponent v šabloně (např. článek, výpis článků, motiv, navigace apod.)

Soubor `main.scss` pak dává do kupy všechny jednotlivé scss soubory (jak vlastní, tak Bootstrap), aby se vše ve výsledku zkompilovalo do jednoho css souboru. Ten je poměrně velký, jelikož se do něj kompiluje kompletní Bootstrap, tedy i to, co se nevyužívá – z toho důvodu, aby uživatelům fungovalo, když použijí v editoru nějakou [utility](https://getbootstrap.com/docs/5.0/layout/utilities/) třídu Bootstrapu.

&nbsp;

## Proměnné <a id="vars"></a>
Proměnné jsou v `base/variables`, ve většině případů jde o barevné varianty šablony, nebo přepsání výchozích proměnných Bootstrapu (je označeno, co jsou vlastní proměnné a co BS). Bootstrap používá všechny proměnné s příznakem `!default`, takže je možné takto přepsat výchozí hodnoty, aniž by se jakkoli zasahovalo do BS souborů (obecně co je ve složce `vendor`, na to se nešahá).

Pro změnu barevné varianty šablony stačí změnit hodnotu proměnné `$primary`. Pro tmavou variantu šablony je potřeba odkomentovat celý blok označený DARK MODE, protože se upravuje více parametrů.

&nbsp;

## Selectory a BEM <a id="selectors-bem"></a>
Selectory, které jsou součástí šablony, která se nemění (tedy vše kromě uživatelských Tiny bloků), využívají konvenci [BEM](https://www.vzhurudolu.cz/prirucka/bem). Díky tomu mají selectory nízkou specificitu (ve většině případů je selectorem jedna konkrétní třída), nehrozí riziko nechtěného přepisování stylů a v neposlední řadě samotný selector napovídá, o jaký prvek se jedná (a v jakém kontextu). Selectory jsou vždy psané plným názvem kvůli jednoduchému vyhledávání.

&nbsp;

## Selectory a Bootstrap <a id="selectors-bs"></a>
Z důvodů konzistence a flexibility se nevyužívají BS třídy přímo, ale skrz `@extend`. Tedy např. button přidání zboží do košíku má třídu `product-item__cart-button`, která skrz `@extend` dědí styly tříd `btn` a `btn-outline-primary`. Díky tomu je možné upravit styly jak globálně (přepsáním stylů pro .btn), tak i každého prvku zvlášť.

Bloky v Tiny editoru naopak využívají přímo BS třídy z toho důvodu, aby to bylo přívětivější pro uživatele (kdo chce a zná Bootstrap, tak může používat a měnit BS třídy dle libosti).

&nbsp;

## Responzivita <a id="responsivity"></a>
Breakpoints jsou definovány ve `vendor/bootstrap/variables` pod proměnnou `$grid-breakpoints`. Výchozí hodnoty jsou `xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px`. Jako všechny BS proměnné, i tato proměnná má příznak `!default`, takže je možné si případně upravit hodnoty předefinováním v `scss/base/variables`. Media queries pak pochopitelně využívají označení breakpointu a ne konkrétní absolutní hodnotu (např. `@include media-breakpoint-up(sm)`).

&nbsp;

## Mixiny <a id="mixins"></a>
Pro usnadnění je tu pár mixinů (`scss/base/mixins`):

`@mixin fullwidth` – pokud je blok v hlavním containeru (který omezuje max. šířku), lze použít tento mixin, kterým se roztáhne na plnou šířku

`@mixin fullwidth-padding` – stejné jako předchozí, ale přidává padding, aby obsah bloku byl stejně široký jako v ostatních blocích (vhodné např. pro blok textu s podbarveným pozadím – text je pořád stejně široký, ale podbarvení je přes celou šířku)

`@mixin auto-color($color)` – pro automatickou barvu písma tak, aby kontrastovala s pozadím. Skrz parametr `$color` se předává barva pozadí, barva textu je pak automaticky světlá nebo tmavá, podle toho, co má oproti pozadí větší kontrast.

`@mixin recolor($color, $opacity)` – pro přebarvení svg obrázků (z černé barvy), zadává se cílová barva a průhlednost, např. `($primary, 1)`

&nbsp;

## Podpora prohlížečů <a id="browsers"></a>
Otestován Chrome, Firefox, Safari (na Macu).

**IE** – je mrtvý. Šablona upřednostňuje výhody a flexibilitu současného kódu nad podporou IE (`flex` a `grid` layout atd). Kdo nutně potřebuje zachovat podporu IE, nechť zůstane u starších šablon.

**Safari** - nefunguje svg filter (mixin `recolor`), tudíž je potřeba vždy podle požadované základní barvy vytvořit klasický filtr (např. https://isotropic.co/tool/hex-color-to-css-filter/). Týká se to třídy `.filter-default` a obecně elementů, kde se přebarvují rastrové obrázky (ikony) na základní barvu šablony. Zkoušeno na verzi Safari 15.1.

&nbsp;

## Doporučení k úpravám <a id="edit"></a>
### Vlastní css
Pro účel tvoření profesních šablon a balíčků na míru – nepřepisovat originální soubory šablony, ale pracovat s tím, co je ve složce `custom-styles`.

### Jednotky
Pokud je to vhodné (což většinou je), tak používat relativní jednotky – `rem`, `em`, atd. Např. pokud má být parametr závislý na velikosti daného elementu, použít `em` (např. odsazení nadpisu nebo velikost ikony vůči textu), pokud má být závislý na velikosti root elementu, použít `rem` (např. jednotné odsazení), pokud má být vždy konstantní, použít `px` (např. šířka rámečku). S `em` jednotkami se občas i ušetří nějaké ty media queries. Super užitečná je funkce `clamp(min-value, relative-value, max-value)`, s tou se také často dají ušetřit media queries, např. `font-size: clamp(1rem, 5vw, 4rem)`.