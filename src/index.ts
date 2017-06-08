import Vue from 'vue'
import Component from 'vue-class-component'
import {markdown} from 'markdown'
import {Watch} from 'vue-property-decorator'

@Component
export class HomeViewModel extends Vue {
  public title: string;
  public description: string;
  public textTypes: string[];
  public selectedTextType: string;

  public data() {
    return {
      description: "",
    };
  }

  public created() {
    this.textTypes = ["html", "plane text", "markdown"];
    this.selectedTextType = this.selectOptions(this.textTypes[2]);
  }

  public updated() {
    return this.description;
  }

  public get markdownDescription(): string {
    return markdown.toHTML(this.description);
  }

  public selectOptions(text): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  public isTextTypeHtml(): boolean {
    return this.compareTextType(0);
  }

  public isTextTypePlaneText(): boolean {
    return this.compareTextType(1);
  }

  public isTextTypeMarkdown(): boolean {
    return this.compareTextType(2);
  }

  public clearText() {
    this.description = "";
  }

  private compareTextType(index: number): boolean {
    return (this.selectOptions(this.textTypes[index]) == this.selectOptions(this.selectedTextType));
  }
}

(<any>window).HomeViewModel = HomeViewModel;

